const { deleteCommentsCache } = require('../helpers/cacheComment');

const { findComment,
    patchComment } = require('../helpers/databaseComment');

exports.patchComment = async (req, res, next) => {
    try {
        const comment = await findComment(req.params.commentId);
        if (!comment) return next();
        if (req.user.rights !== 3 && req.user.userId !== comment.userId) {
            return res.status(403).json({ message: 'niet jouw comment vriend' })
        } else {         
            const patchedComment = await patchComment(comment._id, req.body); 
            deleteCommentsCache(comment.blogId);
            return res.status(201).json({ 
                message: 'comment geedit',
                comment: patchedComment
            });
        }
    } catch (err) {
        next (err);
    }
}
