<template>
    <div v-if="filteredBlogs.length">
        <h2 class="text-ynwa font-header font-bold text-2xl self-center pt-2 px-4 rounded-t-md
            bg-white md:bg-ynwa md:text-white"
        > 
            Most Popular
        </h2>

        <div class="bg-white border-ynwa md:border-4 py-3 pr-4 space-y-2 rounded-b-md shadow-md">
            <article v-for="(blog, index) in filteredBlogs" class="grid grid-cols-10 md:grid-cols-7">

                <div class="text-gray-300 text-2xl m-auto"> {{ index + 1 }} </div>

                <router-link 
                    :to="{ name: 'SingleBlogDetails', 
                        params: { id: blog.id, slug: blog.slug }}" 
                    class="self-center col-start-2 col-span-9 md:col-span-6 
                        ">

                    <h3 class="header-base text-sm font-semibold md:text-sm md:font-medium lg:font-semibold
                        overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                    > 
                        {{ blog.title }} 
                    </h3> 
                </router-link>
            </article>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['filteredBlogs'])
</script>