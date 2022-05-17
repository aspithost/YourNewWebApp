import { ref } from 'vue'
import { axiosAuth } from '../axios'

export default () => {

    const newPasswordResponse = ref(null)

    const setPassword = async (hash, newPassword, userId) => {
        try {
            const res = await axiosAuth.patch(`/users/user/passwordWithHash/${hash}`, { newPassword, userId })
            newPasswordResponse.value = res.data.message
        } catch (err) {
            return (err)
        }
    }

    return { setPassword, newPasswordResponse }
}