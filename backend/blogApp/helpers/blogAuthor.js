const axios = require('axios');

const axiosUserInstance = axios.create({
    baseURL: `${process.env.USER_SERVER}/userapi`
});

const findBlogAuthor = async (userId) => {
    try {
        const res = await axiosUserInstance.get(`/user/blogAuthor?userId=${userId}`);
        return res.data
    } catch (err) {
        return null
    }
}

const findBlogAuthors = async (blogs) => {

    const userIds = new Set();
    blogs.forEach(blog => userIds.add(blog.user));

    for (let userId of userIds) {
        const user = await findBlogAuthor(userId);
        userIds.forEach((usrId, index) => {
            if (usrId === userId) {
                userIds[index] = user
            }
        })
    }

    for (let i = 0; i < blogs.length; i++) {
        blogs[i].author = userIds[i]
    }

    return blogs
}

module.exports = { findBlogAuthor, findBlogAuthors }