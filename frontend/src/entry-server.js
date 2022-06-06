import { renderToString } from 'vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'
import { createApp } from './main'

import { axiosUserSSR } from '/src/composables/axios'

export async function render(url, cookiewallCookie, languageCookie, refreshToken, manifest) {
    const { app, head, router, store } = createApp()

    // If user has a valid refresh token, generate access token & new refresh token
    let accessToken, newRefreshToken
    if (refreshToken) {
        try {
            const response = await axiosUserSSR.post(`/user/autoLogin?SSR=true`, {},
                { headers : { 'Cookie': `refreshCookie=${refreshToken}` }
            })
            accessToken = response.data.accessToken;
            newRefreshToken = response.data.refreshToken;                  
        } catch (err) {}
    }

    // Verify user
    if (accessToken) store.dispatch('verifyUser', accessToken)

    // Language preferences of user
    if (languageCookie) store.dispatch('storeLanguageDutch', languageCookie)

    // Cookiewall on or off
    if (cookiewallCookie) {
        if (Date.now() < cookiewallCookie + 31536000000 && cookiewallCookie > 1646476159087) {
            store.dispatch('allowFunctionalCookies', true)
        } 
    }  

    // set the router to the desired URL before rendering
    router.push(url)
    await router.isReady()
    
    // passing SSR context object which will be available via useSSRContext()
    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    // components that have been instantiated during this render call.
    const ctx = {}

    const html = await renderToString(app, ctx)
    const { headTags } = renderHeadToString(head)

    // the SSR manifest generated by Vite contains module -> chunk/asset mapping
    // which we can then use to determine what files need to be preloaded for this
    // request.
    const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
    
    return [ html, headTags, preloadLinks, store, accessToken, newRefreshToken ]
}

const renderPreloadLinks = (modules, manifest) => {
    let links = ''
    const seen = new Set()
    modules.forEach((id) => {
        const files = manifest[id]
        if (files) {
            files.forEach((file) => {
                if (!seen.has(file)) {
                seen.add(file)
                links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

const renderPreloadLink = (file) => {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    } else if (file.endsWith('.woff')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    } else if (file.endsWith('.woff2')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    } else if (file.endsWith('.gif')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    } else if (file.endsWith('.png')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    } else {
        // TODO
        return ''
    }
}