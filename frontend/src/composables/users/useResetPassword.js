import { ref } from 'vue'
import { axiosUserCredentials } from '../axios'

export default () => {
    const error = ref(null)
    const response = ref(null)

    const resetPassword = async (email) => {
        try {
            const res = await axiosUserCredentials.post('/users/user/newPasswordHash', { email: email })
            response.value = res.data.message
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }
    return { error, resetPassword, response }
}