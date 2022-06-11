<template>
    <article
        v-if="blog"
        :lang="blog.language === 'Nederlands' ? 'nl' : 'en'"
        class="bg-white border border-gray-200 shadow-md rounded-md w-full py-6 px-4 md:px-6 xl:px-8" >

        <header class="flex flex-col border-b pb-3 sm:pb-4">
            <div v-if="blog && userRights >= 2" class="self-end">
                <router-link :to="
                    { name: 'EditBlog',
                    params: { blog: JSON.stringify(blog) }
                }">
                    <button >Edit Blog</button>
                </router-link>
            </div>

            <h1 class="h1-base">
                {{ blog.title }}
            </h1>

           <ColoredTags
                :tags="blog.tags"
                class="pb-4"
           />

            <AuthorBar
                :blogTitle="blog.title"
                :numberOfComments="blog.numberOfComments"
            />
        </header>

        <figure>
            <img v-if="blog.image" class="m-auto"
                :srcset="`${blogServer}/fissafotos/${blog.imageSmall} 400w,
                        ${blogServer}/fissafotos/${blog.image} 640w`"
                sizes="(max-width: 639px) 400px,
                        640px"
                :src="`${blogServer}/fissafotos/${blog.image}`"
                :alt="`${blog.title}`"
            >
            <figcaption v-if="blog.imageAttribution" class="pt-2">
                {{ blog.imageAttribution }}
            </figcaption>
        </figure>

        <div 
            v-html="blog.content" 
            @click="listenToClicks"
            class="blog-content text-default pt-4">
        </div>

        <ColoredTags
            :tags="blog.tags"
            class="border-t py-4 mt-4"
        />

        <AuthorBar
            :blogTitle="blog.title"
            :numberOfComments="blog.numberOfComments"
            class="flex"
        />
    </article>
</template>

<script setup>
import { computed, inject, onMounted, provide, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import AuthorBar from '/src/components/blogs/AuthorBar.vue'
import ColoredTags from '/src/components/blogs/ColoredTags.vue'

import useEventListener from '/src/composables/useEventListener'

import useGetBlog from '/src/composables/blogs/useGetBlog'
import useGetBlogDate from '/src/composables/blogs/useGetBlogDate'
import useGetEmbeddedBlogHTML from '/src/composables/blogs/useGetEmbeddedBlogHTML'

import useGetSocialMediaScripts from '/src/composables/thirdPartyScripts/useGetSocialMediaScripts'
import useHighlightJs from '/src/composables/thirdPartyScripts/useHighlightJs'

const blog = inject('blog')
const { userRights } = inject('user')

const blogServer = import.meta.env.VITE_BLOG_SERVER

const store = useStore()

// Get blog date
const { formattedDate, findDate } = useGetBlogDate()

findDate(blog.value.publishDate)


// Get Social Media Scripts
onMounted (() => {
    useGetSocialMediaScripts()
})


// Get Embedded Blogs
const getEmbeddedBlogs = async () => {
    let frames = document.querySelectorAll('.embedded-blog')
    for ( let i = 0; i < frames.length; i++) {
        let {
            blog: embeddedBlog,
            loadBlog: loadEmbeddedBlog } = useGetBlog()

        await loadEmbeddedBlog(frames[i].id)

        useGetEmbeddedBlogHTML(blogServer, embeddedBlog.value, frames[i])
    }
}


// Pre-tag & Code Highlighter
const highlightCode = ref(false)
onMounted (() => highlightCode.value = true)
useHighlightJs()


// Intercept links to blogs on own website and route with Vue-Router.
const router = useRouter()

const listenToClicks = (event) => {
    if (!event.target.href) return
    if (event.target.href.match(/http:\/\/localhost|https:\/\/yournewwebapp.com/)) {
        event.preventDefault()

        let url = event.target.href
        let path = url.slice(url.indexOf('/', 8))

        router.push(path)
    }
}


// Listen to NoSocialsWrapper Clicks
onMounted (() => {
    if (document.querySelector('.no-socials-div')) {
        document.querySelectorAll('.no-socials-div').forEach(btn => {
            useEventListener(btn, 'click', () => {
                store.dispatch('allowFunctionalCookies', false)
            })
        })
    }
})


onMounted (() => {
    // Load embedded blog wrapper
    if (document.querySelector('.getEmbeddedBlog')) {
        getEmbeddedBlogs()
    }
})

provide('author', computed (() => blog.value?.author))
provide('formattedDate', computed(() => formattedDate.value))

</script>