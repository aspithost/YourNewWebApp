<template>
    <router-link 
        :hreflang="blog.language === 'English' ? 'en' : 'nl'"
        :to="{ name: 'SingleBlogDetails', 
            params: { id: blog.id, slug: blog.slug }}" 
        class="grid h-full grid-cols-10 lg:grid-cols-5 focus:outline-none focus:opacity-80"
    >

        <div class="flex flex-col justify-center sm:items-center col-start-1 text-4xl font-bold text-gray-300 hover:text-gray-400"> {{ index + 1 }} </div>
        <div class="self-center col-start-2 col-span-9 lg:col-span-4">
            <h2 class="clip-text header-base font-bold text-sm 
                sm:text-lg md:text-base lg:text-sm 2xl:text-base"> 
                {{ blog.title }} 
            </h2>
        </div>

    </router-link>
</template>

<script setup>

const props = defineProps({
    blog: Object,
    index: Number
})
</script>