import { ref } from 'vue'
import { axiosAuthCredentials } from '../axios'

export default () => {

    const patchError = ref(null)
    const patchResponse = ref(null)

    const patchUsername = async (newUsername, password) => {
        try {
            const res = await axiosAuthCredentials.patch('/users/user/username', { newUsername, password })
            patchResponse.value = res.data
        } catch (err) {
            patchError.value = err.response ? err.response.data.message : err.message
        }
    }

    const patchPassword = async (newPassword, password) => {
        try {
            const res = await axiosAuthCredentials.patch('/users/user/password', { newPassword, password })
            patchResponse.value = res.data
        } catch (err) {
            patchError.value = err.response ? err.response.data.message : err.message
        }
    }

    const patchAvatar = async (avatar) => {
        try {
            const res = await axiosAuthCredentials.patch('/users/user/avatar', { avatar })
            patchResponse.value = res.data
        } catch (err) {
            patchError.value = err.response ? err.response.data.message : err.message
        }
    }
    
    return { patchError, patchResponse, patchUsername, patchPassword, patchAvatar }
}