<template>
    <ul class="flex flex-row w-full justify-between font-light text-gray-700 divide-x divide-gray-300">
        <li class="hover:opacity-50 flex-grow text-center">
            <router-link :to="{ name: 'Privacy' }" class="focus:outline-none focus:opacity-50">
                Privacy
            </router-link>
        </li>
        <li class="hover:opacity-50 flex-grow text-center">
            <router-link  :to="{ name: 'TermsOfUse' }" class="focus:outline-none focus:opacity-50">
                Terms
            </router-link>
        </li>
        <li class="hover:opacity-50 flex-grow text-center">
            <a href="#" @click="resetCookiePreferences" class="focus:outline-none focus:opacity-50">
                Cookies 
            </a>  
        </li>
        <li class="hover:opacity-50 flex-grow text-center">
            <router-link  :to="{ name: 'Contact' }" class="focus:outline-none focus:opacity-50">
                Contact
            </router-link>
        </li>
    </ul>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

const resetCookiePreferences = () => {
    store.dispatch('allowFunctionalCookies', false)
}
</script>