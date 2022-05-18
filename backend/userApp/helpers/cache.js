const { getRedisClient } = require('./redis');
const client = getRedisClient();

exports.cacheBlacklistedUser = async (user) => {
    user.blacklisted = true;
    await client.hSet(user._id.toString(), 'data', JSON.stringify(user));
    client.expire(user._id.toString(), 1209600);
}

exports.cacheLoggedOutUser = async (user) => {
    user.loggedOut = true;
    await client.hSet(user._id.toString(), 'data', JSON.stringify(user));
    client.expire(user._id.toString(), 1209600);    
}

exports.cacheUser = async (user) => {
    await client.hSet(user._id.toString(), 'data', JSON.stringify(user));
    client.expire(user._id.toString(), 604800);
} 

exports.cacheUserLimited = async (userId, userLimited) => {
    let str = 'author' + userId;
    await client.hSet(str, 'data', JSON.stringify(userLimited));
    client.expire(str, 60);
}

exports.checkUserCache = async (userId) => {
    const cachedUser = await client.hGetAll(userId);
    return cachedUser.data ? JSON.parse(cachedUser.data) : null
}

exports.checkUserCacheLimited = async (userId) => {
    let str = 'author' + userId;
    const cachedUser = await client.hGetAll(str);
    return cachedUser.data ? JSON.parse(cachedUser.data) : null
}

exports.deleteUserCache = (userId) => {
    client.del(userId);
}