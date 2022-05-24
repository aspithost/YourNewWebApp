<template>
    <Suspense>
        <template #default>
            <MostPopularDefault :filteredBlogs="filteredBlogs" />
        </template>
        <template #fallback>
            <MostPopularFallback />
        </template>
    </Suspense>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' 

import useFilterByLanguage from '/src/composables/blogs/useFilterByLanguage'
import useGetFeaturedBlogs from '/src/composables/blogs/useGetFeaturedBlogs'

const MostPopularDefault = defineAsyncComponent (() => import('./MostPopularDefault.vue'))
const MostPopularFallback = defineAsyncComponent (() => import('./MostPopularFallback.vue'))

const { featuredBlogs, loadFeaturedBlogs } = useGetFeaturedBlogs()
const route = useRoute()
const store = useStore()

const languageDutch = computed(() => store.state.languageDutch)

if (!featuredBlogs.value.length) loadFeaturedBlogs()

const filteredBlogs = computed (() => { 
    if (!featuredBlogs.value) return
    let blogId = Number(route.path.match(/\d{1,}/g))

    return useFilterByLanguage(featuredBlogs.value, languageDutch.value)
        .filter(blog => blog.id !== blogId)
        .slice(0, 4)
})

</script>