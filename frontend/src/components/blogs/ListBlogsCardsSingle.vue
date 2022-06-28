<template>
    <router-link 
        :to="{ name: 'SingleBlogDetails', params: { id: blog.id, slug: blog.slug }}" 
        class="focus:outline-none"
    >
        <img       
            class="rounded-t-md object-cover hover:opacity-80 focus:opacity-20 w-full 
                h-[144px] sm:h-[124px] md:h-[176px] lg:h-[96px] xl:h-[100px] 2xl:h-[126px]"     
            :alt="blog.title" 
            :src="`${blogServer}/fissafotos/${blog.twitterThumbnail}`" 
            onerror="this.src='/errorBanner.jpg'"
            width="430" height="225"
            loading="lazy" >

    </router-link> 


    <div class="flex flex-col pb-2 pt-3 px-4">
        <AuthorBarCard />

        <router-link 
            :to="{ name: 'SingleBlogDetails',  params: { id: blog.id, slug: blog.slug }}" 
            class="focus:outline-none focus:underline" 
        >
            <h2 class="clip-text header-base font-bold text-lg pt-2 leading-6 md:leading-6
                sm:text-base md:text-lg md:font-extrabold"
            >
                {{ blog.title }}
            </h2>
        </router-link>

        <ColoredTags 
            :tags="blog.tags"
            class="pt-2"
        />

        <div class="flex justify-end">
            <span class="text-gray-500 self-center text-sm"> 
                {{ numberOfMins }} min read
            </span>
            <span v-if="blog.numberOfComments > 0" 
                class="flex pl-6"
            >
                <span class="mr-1 text-xs sm:text-sm self-center"> {{ blog.numberOfComments }} </span>
                <svg 
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="w-6 h-6 md:w-8 md:h-8 self-center mb-1" 
                    fill="none" 
                    stroke="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </span>
        </div>
    </div> 
</template>

<script setup>
import { computed, provide } from 'vue'

import AuthorBarCard from './AuthorBarCard.vue'
import ColoredTags from './ColoredTags.vue'

import useGetBlogDate from '/src/composables/blogs/useGetBlogDate'
import useSanitizeHTML from '/src/composables/useSanitizeHTML'

const { formattedDate, findDate } = useGetBlogDate()

const props = defineProps({ blog: Object })

const blogServer = import.meta.env.VITE_BLOG_SERVER

const numberOfMins = computed (() => {
    // Omit Code Blocks from reading time
    let codeBlockLength = 0
    if (props.blog.content.match(/\<pre/g)) {
        props.blog.content.match(/^\<pre.+\</gm).forEach(match => codeBlockLength += match.length)
    }
    // Omit any HTML from blog length
    let filteredCode = useSanitizeHTML(props.blog.content)
    return Math.ceil((filteredCode.length - codeBlockLength) / 1250)
})

findDate(props.blog.publishDate)

provide('author', props.blog.author)
provide('formattedDate', formattedDate.value)

</script>