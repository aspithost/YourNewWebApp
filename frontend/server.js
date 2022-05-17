require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');

async function createServer(isProd = process.env.NODE_ENV === 'production') {
    const resolve = (p) => path.resolve(__dirname, p)
    const app = express();

    let vite
    if (!isProd) {
        // LOCAL
        vite = await require('vite').createServer({
        server: { 
            middlewareMode: 'ssr',
            watch: {
                usePolling: true,
                interval: 100
                } 
            }
        });
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        // PRODUCTION
        app.use(require('compression')())
        app.use(
        require('serve-static')(resolve('dist/client'), {
            index: false
            })
        );
    } 

    app.use(cookieParser());
    
    app.use('*', async (req, res) => {
        try { 
            const url = req.originalUrl
            const cookiewallCookie = req.cookies.functionalCookies
            const languageCookie = req.cookies.languageDutch
            const accessToken = req.cookies.accessCookie
            const refreshToken = req.cookies.refreshCookie

            let template, manifest, render
            if (!isProd) {

                // LOCAL
                template = fs.readFileSync(
                    path.resolve(__dirname, 'index.html'),
                        'utf-8'
                    )
                template = await vite.transformIndexHtml(url, template);
                manifest = {};
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            } else {
                // PRODUCTION
                template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
                manifest = require('./dist/client/ssr-manifest.json');
                render = require('./dist/server/entry-server.js').render
            }

            const [appHtml, 
                headTags, 
                preloadLinks, 
                store, 
                newAccessToken ] 
            = await render(url, cookiewallCookie, languageCookie, accessToken, refreshToken, manifest)

            const renderState = `
                <script>window.__INITIAL_STATE__ = ${serialize(store.state)} </script>
            `

            const html = template
                .replace(`<!--initial-state-->`, renderState)
                .replace(`<!--app-html-->`, appHtml)
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--head-tags-->`, headTags)

            //
            if (newAccessToken) {
                res.cookie('accessCookie', newAccessToken, { 
                    maxAge: 300000, 
                    overwrite: true, 
                    sameSite: 'lax',
                    secure: true
                });
            }
                
            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // If an error is caught, let vite fix the stracktrace so it maps back to
            // your actual source code.
            if (!isProd) {
                vite.ssrFixStacktrace(e)
            }
            console.error(e)
            res.status(500).end(e.message)
        }    
    })

    return { vite, app }
}


createServer().then(({ app }) => 
    app.listen(process.env.APP_PORT, () => {
        console.log(`listening on ${process.env.APP_PORT}`)
    })
)