const { deleteBlogsCache } = require('../helpers/cacheBlog.js');

const { createBlog } = require('../helpers/databaseBlog');  

exports.createBlog = async (req, res, next) => {
    try {
        const blog = await createBlog(req.body);
        if (Date.now() >= blog.publishDate && blog.isPublished) {
            deleteBlogsCache();
        } 
        return res.status(200).json({
            message: 'blog created',
            blog
        });
    } catch (err) {
        next (err);
    } 
}