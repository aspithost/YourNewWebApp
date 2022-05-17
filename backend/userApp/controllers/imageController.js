const { resizeImage } = require('../helpers/resizeImage');

exports.formatAvatar = async (req, res, next) => {
    try {
        if(!req.file) throw new Error('no file');

        const filename = await resizeImage(req.file, req.user.username);

        return res.status(200).json({
            message: `Saved avatar ${filename} successfully!`
        });
    } catch (err) {
        next (err);
    }
}