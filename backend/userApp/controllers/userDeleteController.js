const { deleteUserCache } = require('../helpers/cache');

const { deleteCookies } = require('../helpers/cookies');

const { deleteUser } = require('../helpers/databaseUser');

exports.deleteUser = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({message: 'not logged in'});
        } else {
            await Promise.all([
                deleteUserCache(req.user._id), 
                deleteCookies(res), 
                deleteUser(req.user_.id)
            ])
            return res.status(200).json({
                message: `gebruiker ${req.user.username} met email ${req.user.email} is donezo`
            });
        } 
    } catch (err) {
        next (err);
    };
}  