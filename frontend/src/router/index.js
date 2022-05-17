import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import makeRoutes from './routes'

export default function createRouter(store){
    const { routes } = makeRoutes(store)

    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        scrollBehavior (to, from, savedPosition) {
            if ((from.hash || from.name) && to.name === 'Home') {
                return
            } else if (to.hash.match(/blogs\/\d/)) {
                return new Promise (resolve => {
                    setTimeout(() => {
                        resolve({ top: savedPosition.top })
                    }, 200)
                })
            } else {
                return { top: savedPosition ? savedPosition.top : 0 }
            }
        },
        routes
    })
} 