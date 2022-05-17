const { deleteBlogCache } = require('../helpers/cacheBlog.js');

const { deleteBlog,
    findBlogById } = require('../helpers/databaseBlog');  

exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await findBlogById(req.params.id);
        if (req.user.rights < 3 && blog.user !== req.user.userId) {
            res.status(403).json({message: 'je mag alleen eigen blogs deleten vriend'}); 
        } else {
            deleteBlogCache(blog._id);
            await deleteBlog(blog._id);
            return res.status(200).json({
                message: 'blog verwijderd'
            });
        }
    } catch (err) {
        next (err);
    }
}