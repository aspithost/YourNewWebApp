import { ref } from 'vue'
import { axiosAuth } from '../axios'

export default () => {
    const error = ref(null)
    const createdUser = ref(null)
    
    const createUser = async (user) => {
        try {
            const matchedUsername = user.username.match(/^[a-z0-9]{4,16}$/i)
            if (!matchedUsername) {
                error.value = 'You can\'t use that username!'
            } else if (user.password.length < 6) {
                error.value = 'Password has to be at least 6 characters long!'
            } else {    
                const res = await axiosAuth.post('/users/createuser', user)
                createdUser.value = res.data.user
            }
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { createUser, createdUser, error }
}