export default (blogs, languageDutch) => {
    if (!blogs) return []
    if (languageDutch) {
        return blogs.filter(blog => blog.language.includes('Nederlands'))
    } else {
        return blogs.filter(blog => blog.language.includes('English'))
    }
}