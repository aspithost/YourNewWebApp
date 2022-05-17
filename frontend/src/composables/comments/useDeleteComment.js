import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

export default () => {
    const deleteError = ref(null)
    const deleteResponse = ref(null)

    const deleteComment = async (comment) => {
        try {
            const res = await axiosBlogCredentials.delete(`/comments/${comment._id}/${comment.blogId}`)
            deleteResponse.value = res.data.message
        } catch (err) {
            deleteError.value = err.response ? err.response.data.message : err.message
        }
    }

    return { deleteError, deleteResponse, deleteComment }
}