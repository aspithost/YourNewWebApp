<template>
    <div class="ynwacomp">

        <h1 class="h1-narrow"> Featured Posts </h1>

        <div v-for="blog in filteredFeaturedBlogs" class="my-1">

            <router-link 
                :to="{ name: 'SingleBlogDetails', params: { id: blog.id, slug: blog.slug }}"
                class="hover:opacity-50 hover:underline"
            >
                <p>{{ blog.title }}</p>
            </router-link>
            
            <div class="flex justify-between">
                <span class="font-semibold"> {{ blog.featured}} </span>
                <div>
                    <ButtonAlt @click="moveUp(blog)">
                        -1
                    </ButtonAlt>
                    <ButtonAlt @click="moveDown(blog)">
                        +1
                    </ButtonAlt>
                </div>
            </div>
        </div>

        <div v-if="response"> {{ response }} </div>
        <div v-if="error"> {{ error }} </div>
        <Button @click="submitEditedBlogs"
            :toggled="isPending"
            label="Submit Blogs"
            type="submit"
        />
        <Head>
            <title>Your New Web App - Featured Posts</title>
        </Head>
    </div>
</template>

<script setup>
import { Head } from '@vueuse/head'
import { computed, ref } from 'vue'

import useGetFeaturedBlogs from '../composables/blogs/useGetFeaturedBlogs'
import usePatchFeaturedBlogs from '../composables/blogs/usePatchFeaturedBlogs'

const { featuredBlogs, loadFeaturedBlogs } = useGetFeaturedBlogs()
const { error, response, patchFeaturedBlog } = usePatchFeaturedBlogs()

const isPending = ref(false)

await loadFeaturedBlogs()

const originalBlogs = JSON.parse(JSON.stringify(featuredBlogs.value))

const filteredFeaturedBlogs = computed (() => {
    return featuredBlogs.value.sort((a,b) => a.featured > b.featured ? 1 : ((b.featured > a.featured) ? -1 : 0))
})

const moveDown = (blog) => {
    for (let i = 0; i < featuredBlogs.value.length; i++) {
        if ((blog.featured + 1) === featuredBlogs.value[i].featured) {
            featuredBlogs.value[i].featured --
        }
    }
    blog.featured ++
}

const moveUp = (blog) => {
    for (let i = 0; i < featuredBlogs.value.length; i++) {
        if ((blog.featured - 1) === featuredBlogs.value[i].featured) {
            featuredBlogs.value[i].featured ++
        }
    }
    blog.featured --
}

const submitEditedBlogs = async () => {
    isPending.value = true
    let blogs = featuredBlogs.value
    for (let i = 0; i < blogs.length; i++) {
        for (let j = 0; j < originalBlogs.length; j ++) {
            if (blogs[i]._id === originalBlogs[j]._id && blogs[i].featured !== originalBlogs[j].featured) {
                await patchFeaturedBlog(blogs[i])
            }
        }
    }
    if (!response.value && !error.value) {
        response.value = 'Geen blogs veranderd G' 
    }
    isPending.value = false
}

</script>