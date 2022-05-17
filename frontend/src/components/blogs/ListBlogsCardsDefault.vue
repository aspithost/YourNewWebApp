<template>
    <div class="sm:grid sm:grid-cols-2 md:contents lg:grid lg:grid-cols-2 gap-x-2 mt-2 lg:mt-0">
        <article 
            v-for="blog in blogs"
            :lang="blog.language === 'English' ? 'en' : 'nl'"
            class="col-span-1 h-min bg-white border border-gray-300 shadow-md rounded-lg mb-2
                md:ml-2 lg:ml-0" 
        >
            <ListBlogsCardsSingle :blog="blog" />
        </article>
    </div>
</template>

<script setup>
import { inject } from 'vue'
import ListBlogsCardsSingle from './ListBlogsCardsSingle.vue'

const blogs = inject('blogs')

</script>