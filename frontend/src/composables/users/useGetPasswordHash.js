import { ref } from 'vue'
import { axiosUser } from '../axios'

export default () => {
    const user = ref(null)

    const checkPasswordHash = async (hash) => {
        try {
            const res = await axiosUser.get(`/users/user/checkPasswordHash/${hash}`)
            user.value = res.data.user
        } catch (err) {
            return (err)    
        }
    }

    return { checkPasswordHash, user }
}