const { getRedis }= require('./redis');
const client = getRedis();

exports.cacheComments = async (blogId, comments) => {
    let entry = 'comments' + blogId.toString();
    await client.hSet(entry, 'data', JSON.stringify(comments));
    client.expire(entry, 86400);
}

exports.checkCommentsCache = async (blogId) => {
    let entry = 'comments' + blogId.toString();
    const cachedComments = await client.hGetAll(entry);
    return cachedComments.data ? JSON.parse(cachedComments.data) : null;
} 

exports.cacheNumberOfComments = async (blogId, number) => {
    const entry = 'commentsNumber' + blogId.toString();
    await client.hSet(entry, 'numberOfComments', JSON.stringify(number));
    client.expire(entry, 60);
}

exports.checkNumberOfCommentsCache = async (blogId) => {
    let entry = 'commentsNumber' + blogId.toString();
    const num = await client.hGetAll(entry);
    return num.numberOfComments ? JSON.parse(num.numberOfComments) : null;
}

exports.deleteCommentsCache = (blogId) => {
    let entry = 'comments' + blogId.toString();
    client.del(entry);
}