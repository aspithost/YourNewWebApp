import { axiosBlog }from '../axios'
import { ref } from 'vue'

export default () => {
    const comments = ref([])

    const loadComments = async (blogId) => {
        try {
            const data = await axiosBlog.get(`/comments/${blogId}`)
            if (data.data && data.data.comments) {
                comments.value = data.data.comments
            } 
        } catch (err) {
            return err.message
        }
    }    

    return { comments, loadComments }
}