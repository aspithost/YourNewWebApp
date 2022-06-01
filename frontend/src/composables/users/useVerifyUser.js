import { ref } from 'vue'
import { axiosUser } from '../axios'

export default () => {

    const error = ref(null)
    const verified = ref(false)
    const username = ref(null)

    const verifyAccount = async (hash) => {
        try {
            const res = await axiosUser.patch(`/user/activation/${hash}`)
            username.value = res.data.username
            verified.value = true
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { error, username, verified, verifyAccount }
}