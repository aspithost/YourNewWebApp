const { checkBlogCache,
    deleteBlogCache, 
    deleteFeaturedBlogsCache} = require('../helpers/cacheBlog.js');

const { findBlogById,
    patchBlogById } = require('../helpers/databaseBlog');    

exports.patchBlog = async (req, res, next) => {
    try {
        // Check for cached blog
        let blog = await checkBlogCache(req.params.id);
        if (!blog) {

            // Find blog in DB
            blog = await findBlogById(req.params.id);
            if (!blog) return res.status(404).json({ message: 'not found'});
        } 
        // Check rights
        if (req.user.rights === 2 && blog.user !== req.user.userId) {
            return res.status(403).json({ message: 'you may only edit your own blogs' });

        // Patch blog & remove cache
        } else {
            const patchedBlog = await patchBlogById(blog._id, req.body); 
            if (patchedBlog.featured >= 0) {
                deleteFeaturedBlogsCache()
            }
            deleteBlogCache(blog.id)
            return res.status(201).json({
                message: 'Successfully edited',
                blog: patchedBlog
            });
        }
    } catch (err) {
        next (err);
    }
}