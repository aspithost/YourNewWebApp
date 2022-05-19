<template>
    <div class="min-h-[60vh] md:w-full lg:w-3/4 xl:w-1/2 2xl:w-full"
        :class="[ scrollHeight > 1000 ? 'h-[50%]' : 'h-[90%]']"
    >

        <div v-show="route.path === '/'" class="sticky top-20">
            <HomepageSidebar />
        </div>

        <div v-show="route.path.match(/(^\/blogs$)|(^\/blogs\/$)|(^\/blogs\/search)/)" 
            class="sticky top-20" 
            :class="{ 'mt-[59px]' : route.path.match(/blogs\/search/)}"
        >
            <BlogLayout />
        </div>

        <div v-if="route.path.match(/\/blogs\/\d/)" class="sticky top-20">
            <MostPopular />
        </div>

    </div>
    <div v-show="showFooter" class="sticky top-80 border-t border-gray-300 py-4 md:w-full lg:w-3/4 xl:w-1/2 2xl:w-full">
        <MyFooter />     
    </div>

</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import MyFooter from './MyFooter.vue'

const BlogLayout = defineAsyncComponent (() => import('./BlogLayout.vue'))
const HomepageSidebar = defineAsyncComponent (() => import('./HomepageSidebar.vue'))
const MostPopular = defineAsyncComponent (() => import('./MostPopular.vue')) 

const route = useRoute()

// Page Offset
const scrollHeight = ref(0)
const showFooter = ref(false)

onMounted(() => {
    setFooter()
})

const path = computed (() => route.path)
watch(path, () => setFooter())

const setFooter = () => {
    showFooter.value = false
    setTimeout(() => {
        scrollHeight.value = document.body.scrollHeight
        showFooter.value = true
    }, 200)
}
</script>