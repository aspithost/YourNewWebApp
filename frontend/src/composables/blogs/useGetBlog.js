import { ref } from 'vue'
import { axiosBlog } from '../axios'

export default () => {
    const blog = ref(null)
    const error = ref(null)
    const saved = ref(false)

    const loadBlog = async (id) => {
        try {
            const data = await axiosBlog.get(`/blogs/${id}`)
            if (data.status === 204) {
                saved.value = true
                return
            } 
            blog.value = data.data.blog
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { blog, error, loadBlog, saved }
}