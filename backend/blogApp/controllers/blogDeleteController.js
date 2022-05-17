const { deleteBlogCache } = require('../helpers/cacheBlog.js');

const { deleteBlog,
    findBlogById } = require('../helpers/databaseBlog');  

exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await findBlogById(req.params.id);
        if (req.user.rights < 3 && blog.user !== req.user.userId) {
            res.status(403).json({ message: 'You may only delete your own blogs' }); 
        } else {
            deleteBlogCache(blog._id);
            await deleteBlog(blog._id);
            return res.status(200).json({
                message: 'blog deleted'
            });
        }
    } catch (err) {
        next (err);
    }
}