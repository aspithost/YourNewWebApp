const { getRedis }= require('./redis');
const client = getRedis();

exports.cacheBlog = async (blog) => {
    await client.hSet(blog.id.toString(), 'data', JSON.stringify(blog));
    client.expire(blog.id.toString(), 86400);
}

exports.checkBlogCache = async (paramsId) => {
    const cachedBlog = await client.hGetAll(paramsId);
    return cachedBlog.data ? JSON.parse(cachedBlog.data) : null;
} 

exports.cacheBlogs = async (blogs, date, first) => {
    let entry = first ? 'firstblogs' : date.toString();
    await client.hSet(entry, 'data', JSON.stringify(blogs));
    client.expire(entry, 30);            
}

exports.checkBlogsCache = async (date, first) => {
    let entry = first ? 'firstblogs' : date.toString();
    const cachedBlogs = await client.hGetAll(entry);
    return cachedBlogs.data ? JSON.parse(cachedBlogs.data) : null;
} 

exports.cacheFeaturedBlogs = async (blogs) => {
    await client.hSet('featuredblogs', 'data', JSON.stringify(blogs));
    client.expire('featuredblogs', 30);
}

exports.checkFeaturedBlogsCache = async () => {
    const cachedFeaturedBlogs = await client.hGetAll('featuredblogs');
    return cachedFeaturedBlogs.data ? JSON.parse(cachedFeaturedBlogs.data) : null;     
}

exports.deleteBlogCache = (blogId) => {
    client.del(blogId.toString());
}

exports.deleteBlogsCache = () => {
    client.del('firstblogs');
}

exports.deleteFeaturedBlogsCache = () => {
    client.del('featuredblogs');
}