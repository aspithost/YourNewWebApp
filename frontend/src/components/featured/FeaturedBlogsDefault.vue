<template>
    <div
        v-if="filteredFeaturedBlogs.length > 4" 
        class="bg-white rounded-md border border-gray-200 shadow-md p-4 sm:p-6 md:p-4 mb-2"
    >
        <div class="lg:grid lg:grid-cols-8 border-b pb-1">
            <TopStory :blog="filteredFeaturedBlogs[0]" class="pb-2 lg:pb-0"/>
            <div class="flex flex-col space-y-2 pt-2 lg:pt-0 lg:col-start-6 lg:col-span-3">  

                <div v-for="(blog, index) in filteredFeaturedBlogs.slice(1,5)" class="h-1/4">
                    <SingleFeaturedBlog :blog="blog" :index="index"/>
                </div>

            </div>
        </div>
        <div class="grid grid-cols-3 pt-3 gap-x-2">
            <div v-for="blog in filteredFeaturedBlogs.slice(5,8)" class="col-span-1">
                <SingleFeaturedBlogCard :blog="blog" />
            </div>
        </div>
    </div>
</template>

<script setup>  
import { computed, watchEffect } from 'vue'
import { useStore } from 'vuex' 

import SingleFeaturedBlog from './SingleFeaturedBlog.vue'
import SingleFeaturedBlogCard from './SingleFeaturedBlogCard.vue'
import TopStory from './TopStory.vue'

import useFilterByLanguage from '/src/composables/blogs/useFilterByLanguage'
import useGetFeaturedBlogs from '/src/composables/blogs/useGetFeaturedBlogs'
import useHideFeaturedBlogs from '/src/composables/blogs/useHideFeaturedBlogs'

const { featuredBlogs, loadFeaturedBlogs } = useGetFeaturedBlogs()

const store = useStore()
const languageDutch = computed(() => store.state.languageDutch)

if (!featuredBlogs.value.length) await loadFeaturedBlogs()

const filteredFeaturedBlogs = computed (() => {
    return useFilterByLanguage(featuredBlogs.value, languageDutch.value)
})

// Change height SideBar If No Featured Blogs
const { hideFeaturedBlogs } = useHideFeaturedBlogs()

watchEffect(() => {
    hideFeaturedBlogs.value = (filteredFeaturedBlogs.value.length > 4) ? false : true
})

</script>