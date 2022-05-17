import { ref } from 'vue'

import { axiosAuthCredentials } from '../axios'

export default () => {

    const error = ref(null)

    const logoutUser = async () => {
        try {
            await axiosAuthCredentials.get('/users/logout')
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }    
    }

    const logoutUserAllDevices = async () => {
        try {
            await axiosAuthCredentials.get('/users/logoutall')
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { error, logoutUser, logoutUserAllDevices }
}