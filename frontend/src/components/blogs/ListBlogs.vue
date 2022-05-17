<template>
    <Suspense>
        <template #default>
            <ListBlogsDefault />
        </template>
        <template #fallback>
            <ListBlogsFallback />
        </template>
    </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const ListBlogsDefault = defineAsyncComponent(() => import('/src/components/blogs/ListBlogsDefault.vue'))
const ListBlogsFallback = defineAsyncComponent(() => import('/src/components/blogs/ListBlogsFallback.vue'))
</script>