<template>
    <div class="bg-white    divide-y-2 shadow-md rounded-md">
    <article 
        v-for="blog in blogs"
        :lang="blog.language === 'English' ? 'en' : 'nl'"
        class="grid grid-cols-8 p-2 sm:p-3 md:p-2 lg:p-4" 
    >
        <ListBlogsSingle :blog="blog" />
    </article>
    </div>
</template>

<script setup>
import { inject } from 'vue'

import ListBlogsSingle from './ListBlogsSingle.vue'

const blogs = inject('blogs')

</script>