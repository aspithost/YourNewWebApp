import { ref } from 'vue'
import { axiosBlogCredentials }from '../axios'

export default () => {
    const patchError = ref(null)
    const patchResponse = ref(null)

    const patchComment = async(id, content, banned) => {
        try {
            const res = await axiosBlogCredentials.patch(`/comments/${id}`, { content, banned })
            patchResponse.value = res.data.comment
        } catch (err) {
            patchError.value = err.response ? err.response.data.message : err.message
        }
    }

    return { patchError, patchResponse, patchComment }
}