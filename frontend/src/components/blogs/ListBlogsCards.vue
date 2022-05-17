<template>
    <Suspense>
        <template #default>
            <ListBlogsCardsDefault />
        </template>
        <template #fallback>
            <ListBlogsCardsFallback />
        </template>
    </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const ListBlogsCardsDefault = defineAsyncComponent(() => import('/src/components/blogs/ListBlogsCardsDefault.vue'))
const ListBlogsCardsFallback = defineAsyncComponent(() => import('/src/components/blogs/ListBlogsCardsFallback.vue'))
</script>