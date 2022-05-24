import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import makeRoutes from './routes'

export default function createRouter(store){
    const { routes } = makeRoutes(store)

    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        scrollBehavior (to, from, savedPosition) {
            if ((from.hash || from.name) && to.name === 'Home') {
                return
            } else {
                return new Promise (resolve => {
                    setTimeout(() => {
                        resolve({ top: savedPosition.top })
                    }, 100)
                })
            }
        },
        routes
    })
} 