import { ref } from 'vue'
import { axiosUser } from '../axios'

export default () => {

    const newPasswordResponse = ref(null)

    const setPassword = async (hash, newPassword, userId) => {
        try {
            const res = await axiosUser.patch(`/user/passwordReset/${hash}`, { newPassword, userId })
            newPasswordResponse.value = res.data.message
        } catch (err) {
            return (err)
        }
    }

    return { setPassword, newPasswordResponse }
}