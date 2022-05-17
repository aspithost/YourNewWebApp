import { ref } from 'vue'
import { axiosBlog } from '../axios' 

const featuredBlogs = ref([])
    
const loadFeaturedBlogs = async () => {
    try {
        const data = await axiosBlog.get(`/blogs/featured?date=${Date.now()}`) 
        featuredBlogs.value = data.data
    } catch (err) {
        return err
    }
}

export default () => {
    return { featuredBlogs, loadFeaturedBlogs }
}