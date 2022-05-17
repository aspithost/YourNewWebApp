import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

export default () => {
    const blog = ref(null)
    
    const loadSavedBlog = async (id) => {
        try {
            const data = await axiosBlogCredentials.get(`/blogs/saved/${id}`)
            blog.value = data.data.blog  
        } catch (err) {
            return err
        }
    }

    return { blog, loadSavedBlog }
}