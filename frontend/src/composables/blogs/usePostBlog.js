import { ref } from 'vue'
import { axiosBlogCredentials } from '../axios'

export default () => {
    const error = ref(null)
    const response = ref(null)
    
    const postBlog = async (event, blog, newBlog) => {
        try {
            let postType = event.submitter.innerText ? event.submitter.innerText : null

            // Check if blog has publish date
            if (postType === 'schedule Blog' && !blog.publishDate) {
                return error.value = 'je moet wel een datum invullen als je wil schedulen G'   
            } 

            if (postType === 'Schedule Blog' || postType === 'Publish Blog' || blog.isPublished && postType === 'Save Blog') {
                blog.isPublished = true
            } else {
                blog.isPublished = false
            }

            // No blog.featured if value is 'None'
            if (blog.featured === 'None') {
                delete blog.featured
            }

            // Date to UTC
            blog.publishDate = blog.publishDate ? new Date(blog.publishDate) : Date.now()

            // DB Calls
            if (newBlog) {
                const res = await axiosBlogCredentials.post(`/blogs/new`, blog)
                response.value = res.data
                
            } else {
                const res = await axiosBlogCredentials.patch(`/blogs/${blog.id}`, blog)
                response.value = res.data   
            }

        } catch (err) {
            error.value = err.response ? err.response.data.message : err.message
        }
    }
    
    return { error, response, postBlog } 
}