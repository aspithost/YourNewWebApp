<template>
    <div v-if="edited"> {{ edited }} </div>   

    <!-- v-if is voor hydration van saved blog -->
    <BlogArticle v-if="blog" :key="key" />

    <div v-if="isSmallDevice" class="pt-2" >
        <MostPopular />
    </div>

    <div class="bg-white border border-gray-200 w-full rounded-md shadow-md mt-2 grid-row-start-2 py-4 px-4 md:px-6 xl:px-8 ">
        <Suspense>
            <template #default>
                <ListComments v-if="loadComments" :key="key" />
            </template>
            <template #fallback>
                <!-- Still need to style a skeleton for this!! -->
                <p>  </p>
            </template>
        </Suspense>
    </div>


    <Observer @intersect="intersected" />
    <Head v-if="blog"> 
        <title> {{ blog.title }} </title>
        <meta name="article:publisher" content="yournewwebapp" />
        <meta name="author" :content="blog.author?.username" />
        <meta name="description" :content="blog.description" />
        <meta name="date" :content="blog.publishDate" />
        <meta name="image" :content="`https://yournewwebapp.com/fissafotos/${blog.thumbnail}`" />
        <meta name="news_keywords" :content="blog.tags" />       
        <meta property="og:description" :content="blog.description" />
        <meta property="og:image" :content="`https://yournewwebapp.com/fissafotos/${blog.twitterThumbnail}`" />
        <meta property="og:locale" :content="(blog.language === 'Nederlands') ? 'nl' : 'en-US'" />        
        <meta property="og:url" :content="`https://yournewwebapp.com/blogs/${blog.id}/${blog.slug}`" />        
        <meta property="og:title" :content="blog.title" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="yournewwebapp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" :content="blog.description" />
        <meta name="twitter:image" :content="`https://yournewwebapp.com/fissafotos/${blog.twitterThumbnail}`" />
        <meta name="twitter:title" :content="blog.title" />  
        <link rel="canonical" :href="`https://yournewwebapp.com/blogs/${blog.id}/${blog.slug}`" />
    </Head>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, provide, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { Head } from '@vueuse/head'
import { useStore } from 'vuex'

import useGetBlog from '/src/composables/blogs/useGetBlog'
import useGetSavedBlog from '/src/composables/blogs/useGetSavedBlog'

import useSanitizeHTML from '/src/composables/useSanitizeHTML'

const BlogArticle = defineAsyncComponent(() => import('/src/components/blogs/BlogArticle.vue'))
const ListComments = defineAsyncComponent(() => import('../components/comments/ListComments.vue'))
const MostPopular = defineAsyncComponent(() => import ('../components/sidebar/MostPopular.vue'))

const props = defineProps(['id', 'slug', 'user', 'successMessage'])

const route = useRoute()
const router = useRouter()
const store = useStore()

const edited = ref(props.successMessage)


// Load blog
const { blog, loadBlog, saved } = useGetBlog()

await loadBlog(props.id)


if (blog.value && !saved.value) {
    // Re-routen if slug is incorrect
    if (blog.value.slug !== route.params.slug) {
        router.push({ name: 'SingleBlogDetails', params: { id: blog.value.id, slug: blog.value.slug }})
    } 
    // Set description for meta tag
    let sanitized = useSanitizeHTML(blog.value.content)
    blog.value.description = sanitized.slice(0, sanitized.indexOf(' ', 150))
}


// Load comments after Intersection Observer intersected
const loadComments = ref(false)

const intersected = () => {
    if (loadComments.value) return 
    loadComments.value = true
}


// Show Most Popular Component based on screen width
const screenWidth = computed (() => store.state.screenWidth)
const isSmallDevice = computed (() => {
    return screenWidth.value && screenWidth.value < 768 ? true : false
})


// Load new blog if you navigate via Most Popular
const key = ref(null)
onBeforeRouteUpdate ( async (to) => {
    edited.value = null
    to.params.user = props.user
    await loadBlog(to.params.id)
    key.value += 1
})


// If user accepts cookies, re-load blog
const allowCookies = computed (() => store.state.acceptFunctionalCookies)
watch(allowCookies, () => {
    if (allowCookies.value) {
        key.value += 1
    }
})
 

onMounted(async () => {
    // If blog is not published (saved), make new API call with authentication
    if (saved.value) {
        let { blog: savedBlog, loadSavedBlog } = useGetSavedBlog()
        if (!props.user || props.user.rights < 2) {
            router.push({ name: 'FourOFour' })
        } else {
            await loadSavedBlog(props.id)
            if (!savedBlog.value) router.push({ name: 'FourOFour' })
            blog.value = savedBlog.value   
        }
    }
})


// Provide
provide('blog', computed (() => blog.value))
provide('blogId', computed (() => blog.value?.id))

provide('user', {
    userId: props.user?.userId,
    username: props.user?.username, 
    userRights: props.user?.rights 
})

</script>               