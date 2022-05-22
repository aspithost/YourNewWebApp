import { ref } from 'vue'
import { axiosUser } from '../axios'

export default () => {
    const error = ref(null)
    const response = ref(null)

    const generateVerificationEmail = async (email) => {
        try {
            const res = await axiosUser.post('/users/user/newAuthHash', { email: email })
            response.value = res.data.message
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }
    return { error, response, generateVerificationEmail }
}