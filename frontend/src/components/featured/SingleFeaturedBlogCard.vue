<template>
    {{ blog.featured }}
    <div :lang="blog.language === 'English' ? 'en' : 'nl'">
        <router-link :to="{ name: 'SingleBlogDetails', params: { id: blog.id, slug: blog.slug }}"
            class="overflow-hidden rounded flex focus:outline-none focus:opacity-80"
        >
            <img 
                :alt="blog.title" 
                :src="`${blogServer}/fissafotos/${blog.thumbnail}`"
                onerror="this.src='/errorThumbnail.jpg'"
                width="208" height="156"
                class="flex-grow duration-300 hover:scale-105" 
            >
        </router-link>
        <router-link :to="{ name: 'SingleBlogDetails', params: { id: blog.id, slug: blog.slug }}">
            <h2 class="clip-text pt-2 header-base font-bold text-xs 
                    sm:text-base md:text-sm lg:text-base xl:text-sm 2xl:text-base"> 
                {{ blog.title }} 
            </h2>
        </router-link>
    </div>
</template>

<script setup>

const props = defineProps(['blog'])

const blogServer = import.meta.env.VITE_BLOG_SERVER

</script>