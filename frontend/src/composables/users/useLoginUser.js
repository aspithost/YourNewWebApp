import { ref } from 'vue'
import { axiosAuthCredentials } from '../axios'

export default () => {
    const error = ref(null)
    
    const loginUser = async (email, password)  => {
        try {
            await axiosAuthCredentials.post('/users/login', { email, password })
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { error, loginUser }
}