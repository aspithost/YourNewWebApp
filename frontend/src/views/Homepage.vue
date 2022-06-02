<template>
    <div class="text-default">

        <section id="get-coding" class="ynwacomp scroll-mt-20">
            <h2 class="h2-narrow">
                Build That Lightning-Fast Web App
            </h2>
            <p>
                Do you want to build a website that's <strong>ultra-fast</strong>, looks <strong>slick</strong> 
                and scores really well in <strong>SEO</strong> metrics?
                You're in the right place! 
            </p>
            <p>
                Your New Web App features <strong>free tutorials</strong> — ranging from 
                <router-link :to="{ name: 'Search', params: { tag : 'beginner'} }" class="link">
                beginner</router-link> to more 
                <router-link :to="{ name: 'Search', params: { tag : 'advanced'} }" class="link">
                advanced</router-link> topics — describing just how I built all of this. Very meta! 
            </p>
            <p>
                I always wanted to build a blog to 
                improve my coding abilities. But as I got closer to finishing the project, 
                I realized I would have to some actual blogging. 
                Because who would read a blog without blogs? I can see the reviews now:
            </p>

            <BlockQuote 
                class="my-2"
                content="I really liked that part where you didn't discuss single a thing in that nonexistent blog post!"
                captionOne="N. Otreal"
                captionTwo="Fake future reader with a generic stock photo profile picture"
                src="/genericStockphoto.jpg"
                alt="Generic Stockphoto guy"
            />

            <p>
                Rather than serve up a blog without any actual blogs, I decided to write about how I built this very website. 
                Let my experiences building my web app help you build yours!
            </p>

            <p>Head on over to the blog and let's get <router-link :to="{ name: 'Blogs' }" class="link">coding</router-link>!
            </p>
        </section>

        <Observer @intersect="intersected" />

        <section class="mt-6 min-h-[624px] sm:min-h-[328px] md:min-h-[692px] lg:min-h-[296px] xl:min-h-[300px] 2xl:min-h-[326px]">
            <div v-if="filteredBlogs.length">
                <div class="rounded-md">
                    <h3 class="h2-narrow px-4 lg:px-0 pb-2">Featured Blogs</h3>
                </div>  
                <div class="px-2 lg:px-0">
                    <ListBlogsCards />
                </div>   
            </div>
        </section>
        
        <section id="about-ynwa" class="ynwacomp scroll-mt-20 mt-4">
            <h2 class="h2-narrow">
                More Than Just Flashy Front-End Bling
            </h2>   
            <p>
                Your New Web App is more than this fancy-looking frontpage.
                It uses a microservice architecture that makes the application scalable and easy to maintain. 
            </p>
            <p>
                In short, this is how Your New Web App works:
            </p>
            <ul class="list-disc list-inside space-y-1 marker:text-ynwa">
                <li>
                    It uses a Server-Side Rendered Vue App as its frontend.
                </li>
                <li>
                    The Vue App receives its data from multiple back-end Express.js REST API's.
                </li>
                <li>
                    Each REST API stores its data in its own MongoDB database and Redis cache.
                </li>
                <li>
                    All applications are containerized with Docker. 
                </li>
            </ul>
            <p>
                Depending on your developer experience, you may have already worked with some of these programs. 
                If you do, have a look at some of the "<router-link :to="{ name : 'Search', params: { tag: 'intermediate' }}" class="link">
                intermediate</router-link>" or "<router-link :to="{ name : 'Search', params: { tag: 'advanced' }}" class="link">
                advanced</router-link>" tutorials in the blog section.
                And if you do not: Your New Web App has guides for 
                <router-link :to="{ name : 'Search', params: { tag: 'beginner' }}" class="link">
                beginners</router-link>, too!
            </p>
            <p>
                Whether you are a seasoned web developer or just starting out, Your New Web App has something for everyone. 

            </p>
        </section>

        <section class="rounded-md pt-6 px-4 lg:px-0">
            <h3 class="h2-narrow pb-2">
                Hands-On Code-Alongs!
            </h3>
            <div @click="youClicked = !youClicked" class="bg-white p-2 rounded-md shadow-md flex items-center cursor-pointer group hover:bg-ynwa">
                <div class="rounded-full overflow-hidden">
                    <img 
                        src="/abeluzbekistancropped.jpeg" 
                        alt="abel"
                        height="48" width="48"
                        loading="lazy"
                        class="h-10 w-10 sm:h-12 sm:w-12 hover:scale-105 duration-300" 
                    >
                </div>

                <div class="flex-col ml-3 sm:ml-4">
                    <h4 class="text-sm font-semibold group-hover:text-white"> 
                        abel
                    </h4>

                    <div class="text-xs sm:text-sm italic font-light group-hover:text-white"> 
                        That's me holding about $20 worth of foreign money.
                    </div>
                    <div v-show="youClicked" class="text-xs sm:text-sm italic font-light group-hover:text-white">
                        Probably the only time in my life I'll ever have a bag full of cash.
                    </div>
                </div>
            </div>

            <HomepageCodeblock class="min-h-[476px]" v-if="highlightCode" :key="codeblockKey" />
        </section>

        <section id="about-me" class="ynwacomp scroll-mt-20 mt-4">
            <h2 class="h2-narrow">
                Wait, Why Did I Build All Of This?
            </h2>
            <p>
                I'm a “self-taught” full-stack web developer who takes great pleasure in designing and building 
                web applications. In fact, this entire website and all of its — in most cases entirely unnecessary — 
                quirks show that I enjoy doing all this a little too much. 
            </p>
            <p>
                Building this project was the ideal way for me to learn and experiment with full-stack web development. 
            </p>
            <p>
                Although I have no formal education in the field, calling myself “self-taught” would be a disservice to 
                all the excellent free online resources that have helped me tremendously. 
                If you would like to know where I “learned it all”, have a look at this <router-link to="/blogs/"
                class="font-semibold text-ynwa hover:opacity-80">blog post</router-link> 
                where I list some of the resources that have helped me get to this point. 
            </p>
            <p>
                I'd love to hear from you! If you have any questions, comments or suggestions, please <router-link to="/users/join"
                class="link">register </router-link> 
                and leave a comment on any of the blogs! If you prefer more traditional messaging,
                head on over to the <router-link to="/contact" class="link">
                contact page</router-link>.
            </p>
        </section>

        <section>
            <h3 class="h2-narrow px-4 pt-6 pb-2">
                Built With
            </h3>

            <div class="grid justify-between 
                [grid-template-columns:repeat(auto-fill,120px)]
                sm:[grid-template-columns:repeat(auto-fill,140px)]
                lg:[grid-template-columns:repeat(auto-fill,130px)]
                xl:sm:[grid-template-columns:repeat(auto-fill,140px)]
                2xl:[grid-template-columns:repeat(auto-fill,170px)]">

                <a v-for="brand in brands" :href="`https://${brand.url}`" target="_blank">
                    <div class="bg-white p-2 sm:p-4 lg:p-3 xl:p-4 2xl:p-9 mb-2 rounded-md overflow-hidden flex justify-center">
                        <img 
                            :src="`/brands/${brand.image}`"
                            :alt="`Outband link to ${brand.alt}`"
                            :title="brand.alt"
                            class="hover:scale-105 duration-300 h-[100px] object-scale-down"
                            width="100"
                        />
                    </div>            
                </a>

            </div>

            <p class="text-sm px-4 lg:px-0"><strong>Disclaimer so I don't get sued</strong>: I have no affiliation with any of these 
                brands whatsoever. I simply used their software to build this website.
            </p>
        
        </section>

    </div>

    <Head>
        <title>YourNewWebApp</title>
        <meta name="description" content="Helping You Build Your New Web App. Let my experiences building my web app help you build yours."/>
        <meta name="image" content="/YNWASquare.svg" />
        <meta property="og:title" content="yournewwebapp" />
        <meta property="og:url" content="https://yournewwebapp.com" />
        <meta property="og:description" content="Helping You Build Your New Web App. Let my experiences building my web app help you build yours." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/YNWATwitterBanner.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="yournewwebapp" />
        <meta name="twitter:description" content="Helping You Build Your New Web App. Let my experiences building my web app help you build yours." />
        <meta name="twitter:site" content="https://yournewwebapp.com"  />
        <meta name="twitter:image" content="/YNWATwitterBanner.svg" />
        <link rel="canonical" href="https://yournewwebapp.com" />
    </Head>
</template>

<script setup>
import { computed , defineAsyncComponent, inject, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Head } from '@vueuse/head'

import HomepageCodeblock from '/src/components/homepage/HomepageCodeblock.vue'

import useFilterByLanguage from '/src/composables/blogs/useFilterByLanguage'
import useGetFeaturedBlogs from '/src/composables/blogs/useGetFeaturedBlogs'
import brands from '/src/composables/images/brands'
import useHighlightJs from '/src/composables/thirdPartyScripts/useHighlightJs'

const ListBlogsCards = defineAsyncComponent(() => import('/src/components/blogs/ListBlogsCards.vue'))

const youClicked = ref(false)

// Load Blogs
const { featuredBlogs, loadFeaturedBlogs } = useGetFeaturedBlogs()

const intersected = () => {
    if (!featuredBlogs.value.length) loadFeaturedBlogs()
}

// Filter Blogs
const store = useStore()

const languageDutch = computed(() => store.state.languageDutch)
const filteredBlogs = computed (() => useFilterByLanguage(featuredBlogs.value, languageDutch.value))

// Provide/inject blogs
provide('blogs', computed (() => filteredBlogs.value.slice(0,2)))
provide('numberOfCards', 2)


// Re-render codeblock to prevent hydration errors
const codeblockKey = ref(0)
onUnmounted(() => codeblockKey.value += 1)


// Pre-tag & Code Highlighter
const { highlightCode } = useHighlightJs()


// Scroll Into View Logic
const route = useRoute()
const router = useRouter()

// Scroll into view on Mounted
onMounted(() => {
    if (route.hash) {
        setTimeout(() => {
            document.getElementById(route.hash.slice(1))
                .scrollIntoView({ behavior: 'smooth' })
        })
    }
})

// Scroll into view after click op homepage banner button
const clicked = inject('clicked')
const clickedTimeout = ref(false)

watch(clicked, () => {
    clickedTimeout.value = true
    setTimeout(() => {
        clickedTimeout.value = false
    }, 1000)
    router.replace({ hash: clicked.value })
    document.getElementById(clicked.value.slice(1))
        .scrollIntoView({ behavior: 'smooth' })    
})


// Intersection Observer to set url hash
const whenTouching = (entries) => {
    // If navigating after clicking button, do not update hash on scroll for 1 sec
    if (clickedTimeout.value) return
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            router.replace({ hash: entry.target.id ? `#${entry.target.id}` : '' })     
        }   
    })
}

let headerObserver, headerTimeout
onMounted(() => {
    headerObserver = new IntersectionObserver(whenTouching, {
        root: null,
        rootMargin: "0% 0% -80% 0%",
        threshold: 0
    })
    // Timeout so hash does not change on first load & lazy scroll
    headerTimeout = setTimeout(() => {
        document.body.querySelectorAll('h1, main [id]').forEach(header => {
            headerObserver.observe(header) 
        })      
    }, 1000)
})

onUnmounted(() => { 
    clearTimeout(headerTimeout)
    headerObserver.disconnect()
})

</script>