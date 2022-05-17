<template>
    <Suspense>
        <template #default>
            <FeaturedBlogsDefault />
        </template>
        <template #fallback>
            <FeaturedBlogsFallback />
        </template>
    </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const FeaturedBlogsDefault = defineAsyncComponent(() => import('/src/components/featured/FeaturedBlogsDefault.vue'))
const FeaturedBlogsFallback = defineAsyncComponent(() => import('/src/components/featured/FeaturedBlogsFallback.vue'))
</script>