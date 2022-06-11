<template> 
    <router-link :to="{ name: 'SingleBlogDetails', params: { id: blog.id, slug: blog.slug }}" 
        class="col-span-3 rounded max-w-[240px] overflow-hidden focus:outline-none focus:opacity-80">
        
        <img       
            class="hover:scale-105 duration-300"     
            :alt="blog.title" 
            :src="`${blogServer}/fissafotos/${blog.thumbnail}`" 
            onerror="this.src='/errorThumbnail.jpg'"
            width="240" height="180"
            loading="lazy"
        >

    </router-link> 

    <div class="col-span-5 flex flex-col justify-between
            pl-3 pr-1 sm:pl-5 sm:pr-2 md:pl-4 lg:pl-5 2xl:pl-6">
        <router-link :to="{ name: 'SingleBlogDetails',  params: { id: blog.id, slug: blog.slug }}" 
            class="focus:outline-none focus:underline"
        >
            <h2 class="clip-text header-base font-semibold text-sm
                sm:font-bold sm:text-lg md:text-base lg:text-xl"
            >
                {{ blog.title }}
            </h2>
        </router-link>

        <AuthorBar :numberOfComments="blog.numberOfComments" />

    </div>
</template>

<script setup>
import { provide } from 'vue'

import AuthorBar from './AuthorBar.vue'

import useGetBlogDate from '/src/composables/blogs/useGetBlogDate'

const { formattedDate, findDate } = useGetBlogDate()

const props = defineProps(['blog'])

const blogServer = import.meta.env.VITE_BLOG_SERVER

findDate(props.blog.publishDate)

provide('author', props.blog.author)
provide('formattedDate', formattedDate.value)

</script>