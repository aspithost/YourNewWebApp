import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

export default () => {
    const deleteResponse = ref(null)

    const deleteBlog = async (id) => {
        try {
            const res = await axiosBlogCredentials.delete(`/blogs/${id}`)
            deleteResponse.value = res.data.message
        } catch (err) {
            return err
        }
    } 
    
    return { deleteBlog, deleteResponse }
}