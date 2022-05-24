const Blog = require('../models/blog');

exports.createBlog = (body) => {
    return Blog.create(body);
}

exports.deleteBlog = (paramsId) => {
    return Blog.findByIdAndDelete(paramsId); 
}

exports.findBlogById = (paramsId) => {
    return Blog.findOne({ id: paramsId })
        .lean();
}

exports.findBlogs = (date) => {
    return Blog.find({ 
        publishDate: { $lt: date }, 
        isPublished: true })
            .limit(10)
            .lean();
}

exports.findFeaturedBlogs = (date) => {
    return Blog.find({ 
        featured: { $gt: 0 }, 
        isPublished: true })
            .sort('featured')
            .limit(16)
            .lean();
}

exports.findSavedBlogs = (date) => {
    return Blog.find({ 
        publishDate: { $lt: date }, 
        isPublished: false })
            .limit(10)
            .lean();
}

exports.findScheduledBlogs = (date) => {
    return Blog.find({ 
        publishDate: { $gt: date }})
            .sort('publishDate')
            .limit(10)
            .lean();
}

exports.findSearchedBlogs = (date, search) => {
    let regex = new RegExp(search.split(',').join('|'), 'i');
    return Blog.find({ 
        publishDate: { $lt: date }, 
        isPublished: true, 
        tags: { $regex: regex } })
            .limit(10)
            .lean();
}

exports.patchBlogById = (blogId, body) => {
    return Blog.findByIdAndUpdate(
        blogId, 
        body, 
        { new: true });
}