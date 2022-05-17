import { ref } from 'vue'
import { axiosAuth } from '../axios'

export default () => {

    const error = ref(null)
    const verified = ref(false)
    const username = ref(null)

    const verifyAccount = async (hash) => {
        try {
            const res = await axiosAuth.patch(`/users/verify/${hash}`)
            username.value = res.data.username
            verified.value = true
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { error, username, verified, verifyAccount }
}