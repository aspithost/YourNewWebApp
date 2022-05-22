import { ref } from 'vue'

import { axiosUserCredentials } from '../axios'

export default () => {

    const error = ref(null)

    const logoutUser = async () => {
        try {
            await axiosUserCredentials.get('/users/logout')
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }    
    }

    const logoutUserAllDevices = async () => {
        try {
            await axiosUserCredentials.get('/users/logoutall')
        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }

    return { error, logoutUser, logoutUserAllDevices }
}