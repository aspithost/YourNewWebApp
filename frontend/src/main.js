import App from './App.vue'
import { createSSRApp } from 'vue'
import { createHead } from '@vueuse/head'
import createRouter from './router'
import createStore from './store'

import './index.css'

import useBaseComponents from './composables/baseComponents/useBaseComponents'

export function createApp() {
    const app = createSSRApp(App)

    useBaseComponents(app)

    const head = createHead()
    const store = createStore()
    const router = createRouter(store)

    app
        .use(router)
        .use(store)
        .use(head)
    
    return { app, router, store, head }
}