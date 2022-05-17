<template>
    <FormInput 
        @input="onSearchInput" 
        v-model="search" 
        class="w-full" 
        placeholder="Find a blogpost!" 
        type="search"
    />
    <p v-if="blogsError || searchError" class="font-semibold px-2 lg:px-0"> {{ blogsError || searchError }}</p>
    <section v-show="!showBlogsTraditional">
        <ListBlogsCards />
    </section>
    <section v-show="showBlogsTraditional">
        <ListBlogs />
    </section>
    <Observer @intersect="intersected" />
    <Head>
        <title>Your New Web App - Search Blogs</title>
        <meta name="description" content="Search for any blog on Your New Web App">
    </Head>
</template>

<script setup>
import { computed, defineAsyncComponent, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Head } from '@vueuse/head'

import useEmitTag from '/src/composables/blogs/useEmitTag'
import useSearchFilter from '/src/composables/blogs/useSearchFilter'
import useGetBlogs from '/src/composables/blogs/useGetBlogs'
import useGetSearchedBlogs from '/src/composables/blogs/useGetSearchedBlogs'

const ListBlogs = defineAsyncComponent (() => import('/src/components/blogs/ListBlogs.vue'))
const ListBlogsCards = defineAsyncComponent (() => import('/src/components/blogs/ListBlogsCards.vue'))

const props = defineProps(['tag'])
const store = useStore()

const languageDutch = computed(() => store.state.languageDutch)
const showBlogsTraditional = computed(() => store.state.showBlogsTraditional)

// Check if there is a query string. If not, use props
const route = useRoute()

let initialValue = 
    route.query.tag ? 
    typeof route.query.tag !== 'string' ? 
    JSON.parse(route.query.tag) : 
    route.query.tag : 
    props.tag

if (route.query.tag) {
    const router = useRouter()
    router.replace({ name: 'Search' })
}
 
// Searchbox value
const search = ref(initialValue ? 
    typeof initialValue !== 'string' ?
    initialValue.join(' ') :
    initialValue : 
    ''
)

// Compute searchTags
const searchTags = computed (() => { 
    let tags = search.value.toLowerCase().split(' ')
    return tags.filter(tag => tag !== '' && tag !== ' ')
})


const { blogs, error: blogsError, loadBlogs } = useGetBlogs()
const { blogs: searchedBlogs, error: searchError, loadSearchedBlogs } = useGetSearchedBlogs()


// Join blogs && searched 
const allBlogs = computed (() =>  {
    return [...blogs.value, ...searchedBlogs.value]
})
            
// Filtered By Language
const filteredByLanguage = computed (() => {
    if (languageDutch.value) {
        return allBlogs.value.filter(blog => blog.language.includes('Nederlands'))
    } else {
        return allBlogs.value.filter(blog => blog.language.includes('English'))
    }
})

// Filtered By Tags
const filteredBlogs = computed (() => {
    if (!searchTags.value.length) {
        return filteredByLanguage.value
    } else {
        return filteredByLanguage.value.filter(blog => {
            return useSearchFilter (searchTags.value, blog.tags)
        })
    }
})

// Load searched & filter based on already present blogs
const searchedBlogsAll = async (intersected) => {
    await loadSearchedBlogs(searchTags.value, intersected)
    if (!blogs.value.length) return 

    let searchedCopy = [...searchedBlogs.value]
    for (let i = 0; i < searchedCopy.length; i ++) {
        blogs.value.forEach(blog => {
            if (blog.id === searchedCopy[i].id) {
                searchedBlogs.value.splice(searchedBlogs.value.indexOf(searchedCopy[i].id), 1)
            }
        })
    }
}

// Logic on first load
if (!search.value) {
    if (!blogs.value.length) await loadBlogs()
} else {
    if (!searchedBlogs.value.length) {
        searchedBlogsAll()
    } 
}

// Intersected
const intersected = () => {
    if (searchBox) return
    if (!searchTags.value.length) {
        loadBlogs()
    } else {
        if (searchedBlogs.value.length < 10) return
        searchedBlogsAll(true)
    }
}

// Timeout to load searched blogs
let searchBox
const onSearchInput = () => {
    clearTimeout(searchBox)
    searchBox = setTimeout(() => {
        if (!searchTags.value.length) {
            loadBlogs()
        } else {
            searchedBlogsAll()
        }
    }, 500)
}


// Update search after clicking tag
const { tag } = useEmitTag()
watch(tag, () => {
    if (tag.value !== search.value) {
        search.value = tag.value
    }   
})

provide('blogs', computed (() => filteredBlogs.value))

</script>