export default (store) => {

    const authenticate = (to) => {
        if (!store.state.user || store.state.user.rights < 2 && to.path !== '/user') {
            return '/'
        } else {
            setUser(to)
        }
    }

    const checkIfUser = (to, from) => {
        if (store.state.user) return from.path
    }

    const setUser = (to) => {
        to.params.user = store.state.user
    }
    const routes = [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Homepage.vue')
        },
        {
            path: '/blogs',
            name: 'Blogs',
            component: () => import('../views/Blogs.vue'),
            beforeEnter: (to) => setUser(to)
        },
        {
            path: '/blogs/:id/:slug',
            name: 'SingleBlogDetails',
            component: () => import('../views/SingleBlogDetails.vue'),
            props: true,
            beforeEnter: (to) => setUser(to)
        },  
        {
            path: '/blogs/edit',
            name: 'EditBlog',
            component: () => import('../views/EditBlog.vue'),
            props: true,
            beforeEnter: (to) => authenticate(to)  
        },
        {
            path: '/blogs/featured',
            name: 'Featured',
            component: () => import('../views/Featured.vue'),
            beforeEnter: (to) => authenticate(to) 
        },
        {
            path: '/blogs/saved',
            name: 'SavedBlogs',
            component: () => import('../views/SavedBlogs.vue'),
            beforeEnter: (to) => authenticate(to)
        },
        {
            path: '/blogs/scheduled',
            name: 'ScheduledBlogs',
            component: () => import('../views/ScheduledBlogs.vue'),
            beforeEnter: (to) => authenticate(to)
        },
        {
            path: '/blogs/search',
            name: 'Search',
            component: () => import('../views/Search.vue'),
            props: true
        },
        {
            path: '/contact',
            name: 'Contact',
            component: () => import('../views/Contact.vue'),
            meta: { hideCookieWall: true }
        },
        {
            path: '/privacy',
            name: 'Privacy',
            component: () => import('../views/Privacy.vue'),
            meta: { hideCookieWall: true }
        },
        {
            path: '/user',
            name: 'User',
            component: () => import('../views/User.vue'),
            props: true,
            beforeEnter: (to) => authenticate(to)
        },
        {
            path: '/users/join',
            name: 'Join',
            component: () => import('../views/Join.vue'),
            beforeEnter: (to, from) => checkIfUser(to, from)
        },
        {
            path: '/users/login',
            name: 'Login',
            component: () => import('../views/Login.vue'),
            beforeEnter: (to, from) => checkIfUser(to, from)
        },
        {
            path: '/users/password',
            name: 'Password',
            component: () => import('../views/Password.vue'),
            beforeEnter: (to, from) => checkIfUser(to, from)
        },
        {
            path: '/users/verify',
            name: 'Verify',
            component: () => import('../views/Verify.vue'),
            beforeEnter: (to, from) => checkIfUser(to, from)
        },
        {
            path: '/termsofuse',
            name: 'TermsOfUse',
            component: () => import('../views/TermsOfUse.vue'),
            meta: { hideCookieWall: true }
        },
        {
            path: '/404',
            name: 'FourOFour',
            component: () => import('../views/FourOFour.vue')
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue')
        }
    ]

    return { routes }
}