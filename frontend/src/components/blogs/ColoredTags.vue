<template>
    <div>
        <div
            v-for="tag in tags" 
            @click="searchForTag(tag)"
            class="bg-opacity-70 bg-gray-300 inline-block rounded-full shadow-sm cursor-pointer 
                text-sm font-light sm:font-normal
                mr-1 mb-1 pt-1 px-2.5 
                hover:bg-opacity-90 hover:shadow-md focus:shadow-md focus:outline-none"
            :class="[
                { 'bg-gray-200': !tag.match(/beginner|intermediate|advanced|vue|javascript|nodejs|ssr/) },
                { 'bg-green-300' : tag === 'beginner' },
                { 'bg-orange-400' : tag === 'intermediate' },
                { 'bg-red-400' : tag === 'advanced' },
                { 'bg-purple-400' : tag === 'css' },
                { 'bg-blue-500' : tag === 'docker'},
                { 'bg-yellow-200' : tag === 'javascript' },
                { 'bg-green-500' : tag === 'nodejs' },
                { 'bg-cyan-500' : tag === 'ssr' },
                { 'bg-emerald-400' : tag === 'vue' }
            ]"
        >
            #{{ tag }}
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import useEmitTag from '/src/composables/blogs/useEmitTag'

const props = defineProps({ tags: Array })

const router = useRouter()

const searchForTag = (tg) => {
    if (router.currentRoute.value.name === 'Search') {
        const { tag } = useEmitTag()
        tag.value = tg
    } else {
        router.push({ name: 'Search', params: { tag: tg } })
    }
}

</script>