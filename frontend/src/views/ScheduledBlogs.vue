<template>
    <div class="ynwacomp">
        <h1 class="h1-narrow"> Blogs Pipeline </h1>

        <ListBlogs v-if="blogs.length" />

        <Observer @intersect="intersected" />

        <p v-if="!blogs" class="font-bold text-xl"> No Scheduled Blogs </p>
    </div>
    <Head>
        <title>Scheduled Blogs</title>
    </Head>
</template>

<script setup> 
import { computed, defineAsyncComponent, onMounted, provide } from 'vue'
import { Head } from '@vueuse/head'

import useGetScheduledBlogs from '../composables/blogs/useGetScheduledBlogs'

const ListBlogs = defineAsyncComponent (() => import('/src/components/blogs/ListBlogs.vue'))

const { blogs, loadScheduledBlogs } = useGetScheduledBlogs()

const intersected = () => {
    if (!blogs.value.length) return 
    loadScheduledBlogs()
}

onMounted(() => {
    if (!blogs.value.length) loadScheduledBlogs()
})

provide('blogs', computed(() => blogs.value))

</script>