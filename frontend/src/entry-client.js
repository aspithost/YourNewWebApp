import { createApp } from './main';

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

let storeScripts = document.querySelectorAll('body script')
storeScripts.forEach(script => {
    if (script.textContent && script.textContent.includes('window.__')) {
        script.parentNode.removeChild(script)
    }    
})

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    app.mount('#app')
})