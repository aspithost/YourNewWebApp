<template>
    <div class="top-story col-span-5 border-b lg:border-b-0">

        <router-link :to="{ name: 'SingleBlogDetails', params: { id: topBlog.id, slug: topBlog.slug }}" 
            class="flex overflow-hidden rounded focus:outline-none focus:opacity-80"
        >
            <img 
                :alt="topBlog.title" 
                :src="`${blogServer}/fissafotos/${topBlog.twitterThumbnail}`"
                onerror="this.src='/errorBanner.jpg'"
                width="407" height="213"
                class="flex-grow transform duration-300 hover:scale-105" 
            >
        </router-link>

        <div class="pt-2 lg:pt-3">
            <router-link :to="{ name: 'SingleBlogDetails', params: { id: topBlog.id, slug: topBlog.slug }}"
                class="focus:outline-none focus:underline"
            >
                <h2 class="header-base font-bold text-base 
                    sm:text-2xl md:text-xl lg:text-lg xl:text-xl 3xl:text-2xl"> 
                    {{ topBlog.title }} 
                </h2>
            </router-link>
        </div> 
    </div>
</template>

<script setup>
const blogServer = import.meta.env.VITE_BLOG_SERVER

const props = defineProps(['topBlog'])
</script>