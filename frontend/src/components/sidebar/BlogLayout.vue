<template>
    <div 
        class="bg-white border-gray-200 rounded-md shadow-md mb-2 p-2 sm:p-3 lg:p-4"
        :class="
            { 'mt-11' : hideFeaturedBlogs }"
    >
        <h2 class="h2-narrow">
            Select Blogs Layout 
        </h2>

        <h3 class="font-semibold">
            Select Blog Layout
        </h3>
        <RadioGroup 
            v-model="pageLayout"
            name="pageLayout"
            :labels="['Fancy Cards', 'Traditional']" 
        />
        <p class="pt-0">
            I have designed two different layouts for the blog page. The default shows these fancy "cards". 
            There's also a "traditional" look. Give both a look!
        </p>
    </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

import useHideFeaturedBlogs from '/src/composables/blogs/useHideFeaturedBlogs'

const store = useStore()

const showBlogsTraditional = computed (() => store.state.showBlogsTraditional)

const pageLayout = ref(showBlogsTraditional.value ? 'Traditional' : 'Fancy Cards')

const { hideFeaturedBlogs } = useHideFeaturedBlogs()

watchEffect(() => {
    store.dispatch('showBlogsTraditional', pageLayout.value === 'Fancy Cards' ? false : true )
})

</script>