const axios = require('axios');

const axiosUserInstance = axios.create({
    baseURL: `${process.env.AUTH_SERVER}/userapi`
});

const getBlogAuthor = async (userId) => {
    try {
        const res = await axiosUserInstance.get(`/users/findBlogAuthor?userId=${userId}`);
        return res.data
    } catch (err) {
        return null
    }
}

const getBlogAuthors = async (blogs) => {
    const userIds = [];
    blogs.forEach(blog => userIds.push(blog.user));

    const userIdsSet = new Set();
    userIds.forEach(userId => userIdsSet.add(userId));

    for (let userId of userIdsSet) {
        const user = await getBlogAuthor(userId);
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

module.exports = { getBlogAuthor, getBlogAuthors }