import { ref } from 'vue'
import { axiosUserCredentials } from '../axios'

export default () => {
    const error = ref(null)
    
    const loginUser = async (email, password)  => {
        try {
            await axiosUserCredentials.post('/user/login', { email, password })
        } catch (err) {
            error.value = err.response ? err.response.data.message : 'Something went wrong, please try again!'
        }
    }

    return { error, loginUser }
}