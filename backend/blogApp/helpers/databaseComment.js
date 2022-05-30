const Comment = require('../models/comment');
const Comments = require('../models/comments');

exports.createComment = (body) => {
    return Comment.create(body);
}

exports.createCommentsInstance = (blogId) => {
    return Comments.create({ blogId: blogId });
}

exports.deleteComment = (commentId) => {
    return Comment.findByIdAndDelete(commentId)
}

exports.findComment = (commentId) => {
    return Comment.findById(commentId);
}

exports.findComments = (blogId) => {
    return Comment.find({ blogId: blogId })
}

exports.findCommentsInstance = (blogId) => {
    return Comments.findOne({ blogId: blogId });
}

exports.findNumberOfComments = async (blogId) => {
    const comments = await Comment.find({ blogId: blogId }, '_id').lean();
    return comments ? comments.length : 0
}

exports.patchComment = (commentId, body) => {
    return Comment.findByIdAndUpdate(commentId, body, { new: true });
}