const { getBlogAuthor,
    getBlogAuthors } = require('../helpers/blogAuthor')

const { cacheBlog, 
    cacheBlogs,
    cacheFeaturedBlogs,
    checkBlogCache,
    checkBlogsCache,
    checkFeaturedBlogsCache } = require('../helpers/cacheBlog');

const { cacheNumberOfComments,
    checkNumberOfCommentsCache } = require('../helpers/cacheComment');

const { findBlogById,
    findBlogs,
    findFeaturedBlogs,
    findSavedBlogs,
    findScheduledBlogs,
    findSearchedBlogs } = require('../helpers/databaseBlog');    

const { findNumberOfComments } = require('../helpers/databaseComment');

exports.getBlog = async (req, res, next) => {
    try {
        // Check Cache
        const cachedBlog = await checkBlogCache(req.params.id);
        if (!cachedBlog) {
            
            // Check DB
            const dbBlog = await findBlogById(req.params.id);
            if (!dbBlog) { 
                return res.status(404).json({ message: 'not found' });   
            
            // If blog is not published, send empty 204 response to frontend. Frontend can then make call to protected route.
            } else if (!dbBlog.isPublished) {
                return res.status(204).json();

            // Get blog author
            } else {
                dbBlog.author = await getBlogAuthor(dbBlog.user);

                // Find number of comments
                let num = await checkNumberOfCommentsCache(dbBlog.id);
                if (!Number.isInteger(num)) {
                    num = await findNumberOfComments(dbBlog.id);
                    cacheNumberOfComments(dbBlog.id, num); 
                }
                dbBlog.numberOfComments = num;

                // Cache & Return!
                cacheBlog(dbBlog);
                return res.status(200).json({ blog: dbBlog });
            }
        
        // Return cached blog
        } else {
            return res.status(200).json({ 
                message: 'successfully loaded cached blog',
                blog: cachedBlog
            });
        }
    } catch (err) {
        next (err);
    }
}

exports.getBlogs = async (req, res, next) => {
    try {
        if (!req.query.date) {
            req.query.date = Date.now()
            req.query.first = true
        }
        const cachedBlogs = await checkBlogsCache(req.query.date, req.query.first);
        // Get blogs from DB
        if (!cachedBlogs) {
            const blogs = await findBlogs(req.query.date);
            if (!blogs) { 
                return res.status(404).json({ message: 'not found' });   

            // Get blog authors
            } else {
                await getBlogAuthors(blogs);

                // Append number of comments to  blog
                for (i = 0; i < blogs.length; i++) {
                    let num = await checkNumberOfCommentsCache(blogs[i].id);
                    if (!Number.isInteger(num)) {
                        num = await findNumberOfComments(blogs[i].id);
                    }
                    blogs[i].numberOfComments = num;    
                }
            }  

            // Cache & return blogs 
            cacheBlogs(blogs, req.query.date, req.query.first)
            return res.status(200).json(blogs);

        } else {
            return res.status(200).json(cachedBlogs);
        }
    } catch (err) {
        next (err);
    }
}

exports.getFeaturedBlogs = async (req, res, next) => {
    try {
        const cachedFeaturedBlogs = await checkFeaturedBlogsCache();
        if (!cachedFeaturedBlogs) {
            const blogs = await findFeaturedBlogs(req.query.date);

            await getBlogAuthors(blogs);    

            cacheFeaturedBlogs(blogs);
            return res.status(200).json(blogs);
        } else {
            return res.status(200).json(cachedFeaturedBlogs);
        }
    } catch (err) {
        next (err)
    }
}

exports.getSavedBlog = async (req, res, next) => {
    try {
        const dbBlog = await findBlogById(req.params.id);

        dbBlog.author = await getBlogAuthor(dbBlog.user);

        return res.status(200).json({ blog: dbBlog })
    } catch (err) {
        next (err);
    }
}

exports.getSavedBlogs = async (req, res, next) => {
    try {
        const blogs = await findSavedBlogs(req.query.date);

        await getBlogAuthors(blogs);

        return res.status(200).json(blogs);
    } catch (err) {
        next (err);
    }
}

exports.getScheduledBlogs = async (req, res, next) => {
    try {
        const blogs = await findScheduledBlogs(req.query.date);

        await getBlogAuthors(blogs);

        return res.status(200).json(blogs);
    } catch (err) {
        next (err)
    }
}

exports.getSearchedBlogs = async (req, res, next) => {
    try {
        const blogs = await findSearchedBlogs(req.query.date, req.query.search);
        
        await getBlogAuthors(blogs);

        // Append number of comments to  blog
        for (i = 0; i < blogs.length; i++) {
            let num = await checkNumberOfCommentsCache(blogs[i].id);
            if (!Number.isInteger(num)) {
                num = await findNumberOfComments(blogs[i].id);
            }
            blogs[i].numberOfComments = num;
        }  

        return res.status(200).json(blogs);
    } catch (err) {
        next (err)
    }
}
