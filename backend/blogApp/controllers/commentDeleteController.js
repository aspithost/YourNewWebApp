const { deleteBlogCache } = require('../helpers/cacheBlog');

const { deleteCommentsCache } = require('../helpers/cacheComment');

const { deleteComment,
    findComment,
    findComments } = require('../helpers/databaseComment');

exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await findComment(req.params.commentId);

        // Check if comment is nested
        const originalComments = await findComments(comment.blogId);
        const parentComment = await getParentComment(originalComments, req.params.commentId);

        // Delte all nested comments
        await deleteNestedComments(comment);    

        // Delete comment
        await deleteComment(req.params.commentId);

        // In case of parent, remove child reference in parent
        if (parentComment) {
            const index = parentComment.comments ? parentComment.comments.indexOf(req.params.commentId) : parentComment.replies.indexOf(req.params.commentId)
            if (index > -1) {
                await parentComment.comments ? parentComment.comments.splice(index, 1) : parentComment.replies.splice(index, 1)
                parentComment.save();
            }
        }

        // Delete cache
        deleteCommentsCache(req.params.blogId);
        deleteBlogCache(req.params.blogId);
        
        // Return
        return res.status(200).json({ 
            message: 'comment deleted'
        });
    } catch (err) {
        next (err);
    }
}

const getParentComment = (comments, commentId) => {
    for (let i =0; i < comments.length; i++) {
        if (comments[i].replies.includes(commentId)) {
            return comments[i]
        }
    }
}

const deleteNestedComments = async (comment) => {
    const populatedComment = await comment.populate('replies')
    if (populatedComment.replies.length) {
        for ( let i = 0; i < populatedComment.replies.length; i++ ) {
            await deleteComment(populatedComment.replies[i]._id);
            await deleteNestedComments(populatedComment.replies[i])
        }
    }
}       