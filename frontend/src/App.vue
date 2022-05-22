<template>
    <div class="bg-gray-100 min-h-screen text-gray-700 font-sans">

        <NavBar :user="user" class="sticky top-0 bg-white w-full shadow-md z-10" />
        <AdminBar v-if="user && user.rights >= 2" class="bg-gray-300 shadow-sm" />

        <main>

            <HomepageBanner 
                v-if="route.path === '/'" 
                @clicked="clickedLink"    
            />

            <div class="md:grid md:grid-cols-11 2xl:w-[980px] 2xl:m-auto 2xl:grid-cols-7">

                <div class="pb-8 md:pr-1 mt-2 md:col-span-7 lg:col-start-2 lg:col-span-6 xl:col-start-3 
                    xl:col-span-5 2xl:col-start-1"
                >

                    <div v-if="axiosError && route.path !== '/'" class="pb-2">
                        <h2 class="bg-white shadow-md rounded-md p-4 h3-base">Something went wrong! Please try again later.</h2>
                    </div>

                    <Suspense>
                        <router-view />
                    </Suspense>

                </div>

                <aside v-if="showSidebar" class="md:col-span-4 md:pl-1 md:mt-2 2xl:col-span-2">
                    <Sidebar />
                </aside>

            </div>

        </main>

        <footer v-if="screenSize && !showSidebar" class="pb-4 px-8">
            <MyFooter class="border-t border-gray-300 pt-4 text-sm" />
        </footer>
        
        <CookieWall v-if="!cookiesAccepted && !route.meta.hideCookieWall" /> 
        
    </div>
</template>

<script setup>
import { computed, defineAsyncComponent, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import HomepageBanner from './components/HomepageBanner.vue'
import NavBar from './components/navbar/NavBar.vue'

import useAxiosError from './composables/axios/useAxiosError'
import useNProgress from './composables/useNProgress'
import useSetScreenWidth from './composables/useSetScreenWidth'
import useSetUser from './composables/users/useSetUser'

const AdminBar = defineAsyncComponent(() => import('./components/navbar/AdminBar.vue'))
const CookieWall = defineAsyncComponent(() => import('./components/CookieWall.vue'))
const MyFooter = defineAsyncComponent(() => import('./components/sidebar/MyFooter.vue'))
const Sidebar = defineAsyncComponent(() => import('./components/sidebar/Sidebar.vue'))

const route = useRoute()

const store = useStore()

const axiosError = computed (() => store.state.axiosError)
const cookiesAccepted = computed(() => store.state.acceptFunctionalCookies) 
const screenSize = computed (() => store.state.screenSize)
const user = computed (() => store.state.user)

const showSidebar = computed (() => screenSize.value >= 768 ? true : false)

useAxiosError()
useNProgress()
useSetScreenWidth()
useSetUser()

// Homepage Banner Buttons
const clicked = ref(null)
const clickedLink = (val) => clicked.value = val

provide('clicked', computed (() => clicked.value))

</script>