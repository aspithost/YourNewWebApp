import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

const error = ref(null)
const response = ref(null)

const patchFeaturedBlog = async (blog) => {
    try {
        const res = await axiosBlogCredentials.patch(`/blogs/${blog.id}`, blog)
        response.value = res.data.message
    } catch (err) {
        error.value = err.response ? err.response.data.message : err.message
    }
}

export default () => { 
    return { error, response, patchFeaturedBlog }
}