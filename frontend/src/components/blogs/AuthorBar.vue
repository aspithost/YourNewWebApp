<template>
    <div
        class="flex justify-between" 
        lang="en"
    >
        <AuthorBarBasic />

        <div class="self-center">
            <span v-if="route.path.match(/\/blogs\/\d/)">
                <a 
                    :href="`https://facebook.com/sharer.php?u=https://yournewwebapp.com${route.fullPath}`" 
                    target="_blank" 
                    rel="noopener"
                >
                    <img class="inline-block mr-2" 
                        width="25" height="25" 
                        src="/facebookvector.svg" 
                        alt="share with facebook" />
                </a>
                <a 
                    :href="`https://twitter.com/share?url=https://yournewwebapp.com${route.fullPath}&text=${blogTitle}`" 
                    target="_blank" 
                    rel="noopener"
                >
                    <img class="inline-block mr-2" 
                        width="25" height="25" 
                        src="/twittervector.svg" 
                        alt="share with twitter" />
                </a>
                <a 
                    :href="`https://wa.me/?text=${blogTitle} https://yournewwebapp.com${route.fullPath}`" 
                    target="_blank" 
                    rel="noopener"
                >
                    <img class="inline-block" 
                        width="30" height="30" 
                        src="/whatsappvector.svg" 
                        alt="share with whatsapp" />
                </a>
            </span>
            <span v-if="numberOfComments > 0" class="ml-4">
                <span class="mr-1 text-xs sm:text-sm"> {{ numberOfComments }} </span>
                <svg 
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="w-6 h-6 md:w-8 md:h-8 inline-block" 
                    fill="none" 
                    stroke="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
            </span>
        </div>
    </div>     
</template>

<script setup>
import { useRoute } from 'vue-router'

import AuthorBarBasic from './AuthorBarBasic.vue'

const props = defineProps({
    blogTitle: String,
    numberOfComments: Number
})

const route = useRoute()

</script>