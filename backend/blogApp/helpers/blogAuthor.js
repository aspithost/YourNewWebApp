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
    const userIds = [];
    blogs.forEach(blog => userIds.push(blog.user));

    const userIdsSet = new Set();
    userIds.forEach(userId => userIdsSet.add(userId));

    for (let userId of userIdsSet) {
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