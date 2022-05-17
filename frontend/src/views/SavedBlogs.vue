<template>
    <h1 class="h2-narrow px-4 pb-0 md:pb-2">Saved Blogs</h1>
    
    <ListBlogs v-if="blogs.length" />
    
    <Observer @intersect="intersected" />

    <p v-if="!blogs" class="bg-white border border-gray-200 font-bold text-xl p-4"> No Saved Blogs </p>

    <Head>
        <title>Saved Blogs</title>
    </Head>
</template>

<script setup> 
import { computed, defineAsyncComponent, onMounted, provide } from 'vue'
import { Head } from '@vueuse/head'

import useGetSavedBlogs from '../composables/blogs/useGetSavedBlogs'

const ListBlogs = defineAsyncComponent (() => import('/src/components/blogs/ListBlogs.vue'))

const { blogs, loadSavedBlogs } = useGetSavedBlogs()

const intersected = () => {
    if (!blogs.value.length) return
    loadSavedBlogs()
}

onMounted(() => {
    if (!blogs.value.length) loadSavedBlogs()
})

provide('blogs', computed (() => blogs.value))

</script>