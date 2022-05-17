import { ref } from 'vue'

import { axiosBlog } from '../axios'

import useSetBlogs from './useSetBlogs'

const { blogs, date, setBlogs } = useSetBlogs()

const error = ref(null)

const loadBlogs = async () => {
    try { 
        error.value = null
        if (date.value === Infinity) return

        const data = await axiosBlog.get(`/blogs?date=${date.value ? date.value : `${Date.now()}&first=true`}`)
        
        setBlogs(data)

    } catch (err) {
        error.value = err.response ? err.response.data.message : err.message
    }
}

export default () => {
    return { blogs, error, loadBlogs }
}