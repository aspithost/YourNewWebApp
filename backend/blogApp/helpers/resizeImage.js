const sharp = require('sharp');

const mediaTypes = {
    UploadImage: {
        resize : {
            width: 640,
            height: 480
        },
        path : 'images'
    },
    UploadImageNoCrop: {
        resize : {
            width: 640
        },
        path : 'images'        
    },
    UploadImageSmall: {
        resize: {
            width: 400,
            height: 300
        },
        path: 'images'
    },
    UploadThumbnail: {
        resize : {
            width: 240,
            height: 180
        },
        path : 'thumbnails'        
    },
    UploadTwitterThumbnail: {
        resize : {
            width: 600,
            height: 314
        },
        path : 'thumbnails'        
    },
}


exports.resizeImage = async (file, mediaType) => {

    let middle 
    if (mediaType.match(/thumbnail/i)) {
        middle = `-${mediaType}-`
    } else if (mediaType.match(/SubmitImageSmall/i)) {
        middle = '-small-'
    } else {
        middle = '-'
    }
    
    let filename = 
        new Date().toISOString().substring(0,10) +
        middle  +
        file.originalname;

    if (mediaType === 'UploadImageFullQuality') {
        await sharp(file.buffer).toFile(process.env.NODE_ENV === 'production' ? 
        `/usr/src/app/public/images/${filename}` : 
        `public/images/${filename}`);

    } else {
        const type = mediaTypes[mediaType];

        if (filename.match(/.jpg|.jpeg|.png$/)) {
            if (!filename.match(/.jpeg$/)) {
                filename = filename.slice(0, filename.indexOf('.')) + '.jpeg'
            }
            await sharp(file.buffer)
                .resize(type.resize)
                .jpeg(90)
                .toFile(process.env.NODE_ENV === 'production' ? 
                    `/usr/src/app/public/${type.path}/${filename}` : 
                    `public/${type.path}/${filename}`);       
        } else {
            await sharp(file.buffer)
                .resize(type.resize)
                .toFile(process.env.NODE_ENV === 'production' ? 
                    `/usr/src/app/public/${type.path}/${filename}` : 
                    `public/${type.path}/${filename}`);            
        }
    }

    return filename
}