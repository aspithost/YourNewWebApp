const { cacheNumberOfComments,
    checkCommentsCache, 
    checkNumberOfCommentsCache, 
    cacheComments} = require('../helpers/cacheComment');

const { findCommentsInstance } = require('../helpers/databaseComment');

exports.getComments = async (req, res, next) => {
    try {
        // In cache kijken voor het aantal comments
        const numberOfCachedComments = await checkNumberOfCommentsCache(req.params.blogId);
        if (numberOfCachedComments === 0) {
            return res.status(200).json({ message: 'geen comments' });

        // Indien er geen cache entry is voor aantal comments, zoeken naar comments entry in cache.
        } else {
            const cachedComments = await checkCommentsCache(req.params.blogId);
            if (!cachedComments) {

                // Zoeken naar comments in DB & cachen van het aantal comments 
                const dbCommentsInstance = await findCommentsInstance(req.params.blogId);
                if (!dbCommentsInstance) {
                    cacheNumberOfComments(req.params.blogId, 0);
                    return res.status(200).json({ 
                        message: 'No comments yet for this blog!' 
                    });
                } else {
                    // Populate comments
                    const populatedCommentsInstance = await dbCommentsInstance.populate('comments');

                    // Loop om alle replies te populaten
                    let numberOfComments = 0
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
                    
                    const commentsArray = await populateComments(populatedCommentsInstance.comments);
                    // Alles cachen
                    cacheComments(req.params.blogId, commentsArray);
                    cacheNumberOfComments(req.params.blogId, numberOfComments);

                    return res.status(200).json({
                        comments: commentsArray
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