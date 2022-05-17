<template>
    <div class="flex items-end">

        <img 
            v-if="author.avatar" 
            :src="`${authServer}/avatars/${author.avatar}`" 
            :alt="author.username"
            height="40"
            width="40"
            class="rounded-full self-center h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 md:mr-3 2xl:mr-4" 
            :class="{ 'h-6 w-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10' : !route.path.match(/\/blogs\/\d/)  }"
        />

        <div class="flex-col">
            <div 
                class="text-xs sm:text-sm"
                :class="{'md:text-xs lg:text-sm' : !route.path.match(/\/blogs\/\d/) }"> 
                    {{ author.username }} 
            </div>

            <div 
                class="text-xs sm:text-sm italic font-light"
                :class="{'md:text-sm lg:text-sm' : !route.path.match(/\/blogs\/\d/) }"> 
                    {{ writtenDate }}
            </div>
        </div>

    </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRoute } from 'vue-router'

const author = inject('author')
const writtenDate = inject('writtenDate')

const route = useRoute()

const authServer = import.meta.env.VITE_AUTH_SERVER
</script>