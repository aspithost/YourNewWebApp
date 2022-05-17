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
        cb ('Error: niet de juiste image G');
    }
}

exports.preUpload = multer({
    storage: memoryStorage,/*storage,
    limits: { fileSize: 500000},*/
    fileFilter: fileFilter
}).single('selectedAvatar');