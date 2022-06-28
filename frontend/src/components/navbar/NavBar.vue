<template>
    <header> 
        
        <div class="grid grid-cols-11 2xl:grid-cols-7 2xl:w-[980px] 2xl:m-auto
            px-2 py-4 md:py-5 sm:px-6 lg:px-4 xl:px-0">

            <router-link 
                :to="{ name: 'Home'}"
                class="flex flex-col outline-none items-start justify-center col-start-1 lg:col-start-2 xl:col-start-3 col-span-6 lg:col-span-4
                    2xl:col-start-1 2xl:col-span-3 cursor-default"
            >
                <div class="text-ynwa font-extrabold text-2xl font-header 
                    hover:cursor-pointer hover:text-opacity-90 focus:outline-none focus:text-ynwa"
                > 
                    Your New Web App
                </div>
            </router-link>

            <nav class="col-start-9 col-span-3 md:col-start-7 md:col-span-5 lg:col-start-7 lg:col-span-4 xl:col-start-7 xl:col-span-3
               2xl:col-start-5">

                <ul class="flex h-full items-center justify-between text-gray-600 text-lg font-extrabold">

                    <li 
                        v-for="link in user ? 
                            ['Blogs', 'Search', 'User'] :
                            ['Blogs', 'Search', 'Login', 'Join']"
                        class="hidden md:flex pt-1"
                    >
                        <router-link
                            :to="{ name : `${link}` }"
                            class="hover:text-ynwa"    
                        >   
                            {{ link === 'User' ? user.username : link }}
                        </router-link>
                    </li>

                    <li>
                        <Languages />
                    </li>

                    <li class="md:hidden" >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                @click="openDropdown = !openDropdown"
                                width="24" height="24" 
                                viewBox="0 0 24 24" fill="none" 
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="cursor-pointer">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                            <ul 
                                v-if="openDropdown" 
                                @click="openDropdown = !openDropdown"
                                class="bg-white border border-gray-200 absolute shadow-md right-0 mt-6
                                    text-sm font-bold"
                            >
                                <li 
                                    v-for="link in user ? 
                                        ['Blogs', 'Search', 'User' ] : 
                                        ['Blogs', 'Search', 'Login', 'Join']" 
                                    class="cursor-pointer px-4 py-1 hover:bg-gray-100"
                                > 
                                    <router-link 
                                        :to="{ name: `${link}` }"
                                        class="hover:text-ynwa focus:outline-none focus:text-ynwa" 
                                    >
                                        {{ link === 'User' ? user.username : link }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import Languages from './Languages.vue'

import useEventListener from '/src/composables/useEventListener'

const props = defineProps({ user: Object })

const route = useRoute()

const openDropdown = ref(false)

onMounted(() => {
    useEventListener(document, 'keydown', event => {
        if (event.key === 'Escape' && openDropdown.value) {
            openDropdown.value = false
        }
    })
})
</script>