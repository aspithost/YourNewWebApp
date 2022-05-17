import { ref } from 'vue'
import { axiosBlog } from '../axios'

const blogs = ref([])
const date = ref(null)
const error = ref(null)

const loadSearchedBlogs = async (search, intersected) => {
    try {   
        error.value = null
        let data

        if (intersected) {
            if (date.value === Infinity) return
            data = await axiosBlog.get(`/blogs/search?date=${date.value}&search=${search}`) 
        } else {
            data = await axiosBlog.get(`/blogs/search?date=${Date.now()}&search=${search}`) 
        }

        date.value = data.data.length ? Date.parse(data.data[data.data.length - 1].publishDate) : Infinity

        if (!data.data) {
            return 
        } else if (!blogs.value.length) {
            blogs.value = [...blogs.value, ...data.data] 
        } else {
            let newBlogs = data.data
            for (let i = 0; i < newBlogs.length; i++) {
                blogs.value.forEach(blog => {
                    if (newBlogs[i].id === blog.id) {
                        data.data.splice(data.data.indexOf(newBlogs[i]), 1)
                    }
                })
            }
            blogs.value = [...blogs.value, ...data.data]
        }    

    } catch (err) {
        error.value = err.response ? err.response.data.message : err.message
    }
} 

export default () => {
    return { blogs, error, loadSearchedBlogs }
}