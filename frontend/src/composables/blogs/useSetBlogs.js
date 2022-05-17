import { ref } from 'vue'

export default () => {
    const blogs = ref([])
    const date = ref(null)

    const setBlogs = (data) => {
        if (!data.statusText == 'OK') {
            throw Error('waar zijn mn blogs vriend')
        } else {
            blogs.value = [...blogs.value, ...data.data]
            date.value = data.data.length ? Date.parse(blogs.value[blogs.value.length - 1].publishDate) : Infinity
        }
    }

    return { blogs, date, setBlogs }
}