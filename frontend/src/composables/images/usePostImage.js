import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

export default () => {
    const error = ref(null)
    const response = ref(null)

    const uploadImage = async (formData) => {
        try {
            const res = await axiosBlogCredentials.post('/images/upload', 
                formData, { 
                    headers: { 'Content-Type': 'multipart/form-data'}
                })
            response.value = res.data.message
        } catch (err) {
            error.value = err.response.data.message
        }
    }

    return { error, response, uploadImage }
}