const { resizeImage } = require('../helpers/resizeImage');

exports.formatImage = async (req, res, next) => {
    try {
        if(!req.file) throw new Error('no file');
        const filename = await resizeImage(req.file, req.body.type);
        return res.status(200).json({
            message: `Saved image ${filename} successfully!`
        });
    } catch (err) {
        next (err);
    }
}