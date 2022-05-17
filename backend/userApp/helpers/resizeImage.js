const sharp = require('sharp');

exports.resizeImage = async (file, username) => {
    
    let filename = 
        username +
        file.originalname;

    if (filename.match(/.jpg|.jpeg|.png$/)) {
        if (!filename.match(/.jpeg$/)) {
            filename = filename.slice(0, filename.indexOf('.')) + '.jpeg'
        }
        await sharp(file.buffer)
            .resize({ width: 100, height: 100 })
            .jpeg(90)
            .toFile(process.env.NODE_ENV === 'production' ? 
                `/usr/src/app/public/avatars/${filename}` : 
                `public/avatars/${filename}`);       
    } else {
        await sharp(file.buffer)
            .resize({ width: 100, height: 100 })
            .toFile(process.env.NODE_ENV === 'production' ? 
                `/usr/src/app/public/avatars/${filename}` : 
                `public/avatars/${filename}`);            
    }
    return filename
}












async (req, res, next) => {
    if (!req.file) return;
    const avatar = await sharp(req.file.buffer)
        .resize({ width: 40, height: 40 })
        .jpeg({ quality: 80 })
        .toBuffer();
    req.body.avatar = avatar;
    next();
}