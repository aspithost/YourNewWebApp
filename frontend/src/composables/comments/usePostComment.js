import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

export default () => {
    const postError = ref(null)
    const postResponse = ref(null)

    const postComment = async (comment) => {
        try {
            // Filter out links
            if(comment.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
                return postError.value = 'You can\'t do that'
            }
            // Remove whitespace
            comment.content = comment.content.replace(/\s{2,}/g, ' ')

            if (comment.commentId) {
                const res = await axiosBlogCredentials.post(`/comments/reply`, comment)
                postResponse.value = res.data
            } else {
                const res = await axiosBlogCredentials.post(`/comments/comment`, comment)
                postResponse.value = res.data
            } 
        } catch (err) {
            postError.value = err.response ? err.response.data.message : err.message
        }
    }

    return { postError, postResponse, postComment }
}