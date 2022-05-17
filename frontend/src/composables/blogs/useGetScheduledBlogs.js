import { axiosBlogCredentials } from '../axios'

import useSetBlogs from './useSetBlogs'

const { blogs, date, setBlogs } = useSetBlogs()
 
const loadScheduledBlogs = async () => {
    try { 
        if (date.value === Infinity) return
        if (!date.value) date.value = Date.now()

        const data = await axiosBlogCredentials.get(`/blogs/scheduled?date=${date.value}`)   

        setBlogs(data)
        
    } catch (err) {
        return err
    }
}

export default () => {
    return { blogs, loadScheduledBlogs }
}