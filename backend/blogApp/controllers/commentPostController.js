const { deleteBlogCache } = require('../helpers/cacheBlog');

const { deleteCommentsCache } = require('../helpers/cacheComment');

const { createComment,
    createCommentsInstance, 
    findComment,
    findCommentsInstance } = require('../helpers/databaseComment');

exports.createComment = async (req, res, next) => {
    try {
        // Comments Instance ophalen uit DB
        let commentsInstance = await findCommentsInstance(req.body.blogId);
        if (!commentsInstance) {
            commentsInstance = await createCommentsInstance(req.body.blogId);
        }
        
        // Nieuwe Comment maken, aan commentsInstance toevoegen en opslaan
        const newComment = await createComment(req.body);
        await commentsInstance.comments.push(newComment);
        await commentsInstance.save();

        // Comments cache & blog cache verwijderen en returnen.
        deleteBlogCache(req.body.blogId);
        deleteCommentsCache(req.body.blogId);
        return res.status(200).json({ 
            message: 'fissa comment aangemaakt',
        });
    } catch (error) {
        next (error);
    }
}

exports.createReply = async (req, res, next) => {
    try {
        const comment = await findComment(req.body.commentId);
        const reply = await createComment(req.body); 
        await comment.replies.push(reply);
        await comment.save();   
        deleteBlogCache(req.body.blogId);
        deleteCommentsCache(req.body.blogId);
        return res.status(200).json({
            message: 'reply gemaakt',
            reply
        })
    } catch (err) {
        next (err);
    }
}
