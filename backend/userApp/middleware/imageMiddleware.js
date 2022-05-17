const multer = require('multer');
const path = require('path');

const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb (null, true);
    } else {
        cb ('Error: not the right image');
    }
}

exports.preUpload = multer({
    storage: memoryStorage,
    fileFilter: fileFilter
}).single('selectedAvatar');