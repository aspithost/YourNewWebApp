import { ref } from 'vue'

const hideFeaturedBlogs = ref(false)

export default () => {
    return { hideFeaturedBlogs }
}