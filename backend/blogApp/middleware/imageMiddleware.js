// Path
const path = require('path');

// Multer 
const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|jif|jfif|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb (null, true);
    } else {
        cb ('Error: niet de juiste image G');
    }
}

exports.preUpload = multer({
    storage: memoryStorage,
    limits: { fileSize: 5000000},
    fileFilter: fileFilter
}).single('imageUpload');