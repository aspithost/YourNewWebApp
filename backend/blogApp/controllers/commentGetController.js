const { cacheNumberOfComments,
    checkCommentsCache, 
    checkNumberOfCommentsCache, 
    cacheComments} = require('../helpers/cacheComment');

const { findCommentsInstance } = require('../helpers/databaseComment');

exports.getComments = async (req, res, next) => {
    try {
        // Check for number of comments in cache
        const numberOfCachedComments = await checkNumberOfCommentsCache(req.params.blogId);
        if (numberOfCachedComments === 0) {
            return res.status(200).json({ message: 'no comments' });

        // If no cache entry for number of comments, check for comments entry in cache
        } else {
            const cachedComments = await checkCommentsCache(req.params.blogId);
            if (!cachedComments) {

                // Search comments in DB & cache number of comments
                const dbCommentsInstance = await findCommentsInstance(req.params.blogId);
                if (!dbCommentsInstance) {
                    cacheNumberOfComments(req.params.blogId, 0);
                    return res.status(200).json({ 
                        message: 'No comments yet for this blog!' 
                    });
                } else {
                    // Populate comments
                    const populatedCommentsInstance = await dbCommentsInstance.populate('comments');

                    // Loop to populate replies
                    const { comments, numberOfComments } = await getPopulatedComments(populatedCommentsInstance.comments);

                    // Alles cachen
                    cacheComments(req.params.blogId, comments);
                    cacheNumberOfComments(req.params.blogId, numberOfComments);

                    return res.status(200).json({
                        comments
                    });
                }   
            } else {
                return res.status(200).json({
                    comments: cachedComments
                });
            }
        }
    } catch (err) {
        next (err);
    }
}

const getPopulatedComments = async (comments) => {

    let numberOfComments = 0;

    const populateComments = async (comments) => {
        for (let i = 0; i < comments.length; i++) {  
            numberOfComments += 1;
            if (comments[i].replies.length) {
                await comments[i].populate('replies')
                await populateComments(comments[i].replies)
            } 
        }
        return comments     
    }

    await populateComments(comments);

    return { comments, numberOfComments } 
}