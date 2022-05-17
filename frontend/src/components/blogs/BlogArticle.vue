<template>
    <Suspense>
        <template #default>
            <BlogArticleDefault />
        </template>
        <template #fallback>
            <BlogArticleFallback />
        </template>
    </Suspense>   
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const BlogArticleDefault = defineAsyncComponent(() => import('/src/components/blogs/BlogArticleDefault.vue'))
const BlogArticleFallback = defineAsyncComponent(() => import('/src/components/blogs/BlogArticleFallback.vue'))

</script>