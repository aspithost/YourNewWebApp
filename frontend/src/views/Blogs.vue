<template>
    <section>
        <FeaturedBlogs />
    </section>
    <h1 
        v-if="filteredBlogs.length"
        class="h2-narrow px-4 pb-0 md:pb-2"
    >
        Latest Blogs
    </h1>
    <section v-show="!showBlogsTraditional">
        <ListBlogsCards />
    </section>
    <section v-show="showBlogsTraditional">
        <ListBlogs />
    </section>

    <Observer @intersect="intersected" />
    <Head>
        <title>Blogs</title>
        <meta name="description" content="The latest blog posts from Your New Web App" />
    </Head>
</template>

<script setup>
import { computed , defineAsyncComponent, provide } from 'vue'
import { useStore } from 'vuex'
import { Head } from '@vueuse/head'

import useGetBlogs from '/src/composables/blogs/useGetBlogs'

const FeaturedBlogs = defineAsyncComponent(() => import('/src/components/featured/FeaturedBlogs.vue'))
const ListBlogsCards = defineAsyncComponent(() => import('/src/components/blogs/ListBlogsCards.vue'))
const ListBlogs = defineAsyncComponent(() => import('/src/components/blogs/ListBlogs.vue'))

const store = useStore()
const { blogs, loadBlogs } = useGetBlogs()

const showBlogsTraditional = computed(() => store.state.showBlogsTraditional)

if (!blogs.value.length) await loadBlogs()

const intersected = () => {
    loadBlogs()
}

const languageDutch = computed(() => store.state.languageDutch)
const filteredBlogs = computed (() => {
    if (languageDutch.value) {
        return blogs.value.filter(blog => blog.language.includes('Nederlands'))
    } else {
        return blogs.value.filter(blog => blog.language.includes('English'))
    }
})

provide('blogs', computed (() => filteredBlogs.value))

</script>