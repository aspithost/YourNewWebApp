<template>
    <EditBlog :blog="blog" :user="user" />
    <Head>
        <title>Edit Blog</title>
    </Head> 
</template>

<script setup>
import { Head } from '@vueuse/head'

import EditBlog from '../components/blogs/EditBlog.vue'

const props = defineProps({
    blog: Object,
    user: Object
})

</script>