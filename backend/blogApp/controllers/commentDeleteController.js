const { deleteBlogCache } = require('../helpers/cacheBlog');

const { deleteCommentsCache } = require('../helpers/cacheComment');

const { deleteComment,
    findComment,
    findComments } = require('../helpers/databaseComment');

exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await findComment(req.params.commentId);

        //Kijken of comment op de blog zelf geplaatst is
        const originalComments = await findComments(req.params.blogId);
        const parentComment = await getParentComment(originalComments, req.params.commentId);

        // // Alle reacties op de comment ophalen en verwijderen.
        await deleteNestedComments(comment);    

        // Oorspronkelijke comment zelf deleten
        await deleteComment(req.params.commentId);

        // Indien er een parent is, comment weghalen uit replies;
        if (parentComment) {
            const index = parentComment.comments ? parentComment.comments.indexOf(req.params.commentId) : parentComment.replies.indexOf(req.params.commentId)
            if (index > -1) {
                await parentComment.comments ? parentComment.comments.splice(index, 1) : parentComment.replies.splice(index, 1)
                parentComment.save();
            }
        }

        // Cache van comments op deze blog weghalen en cache van blog zelf ook verwijderen
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