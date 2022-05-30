import { ref } from 'vue'

import { axiosBlog, axiosBlogSSR } from '/src/composables/axios'

import useSetBlogs from './useSetBlogs'

const { blogs, date, setBlogs } = useSetBlogs()

const error = ref(null)

const loadBlogs = async () => {
    try {
        const SSR = typeof window === 'undefined'
        error.value = null
        if (date.value === Infinity) return

        let data
        if (SSR) {
            data = await axiosBlogSSR.get(`/blogs?date=${date.value ? date.value : `${Date.now()}&first=true`}`)
        } else {
            data = await axiosBlog.get(`/blogs?date=${date.value ? date.value : `${Date.now()}&first=true`}`)
        }
        
        setBlogs(data)

    } catch (err) {
        error.value = err.response ? err.response.data.message : err.message
    }
}

export default () => {
    return { blogs, error, loadBlogs }
}