const mongoose = require('mongoose');

let DBURL
if (process.env.NODE_ENV === 'production') {
    DBURL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`;
} else {
    DBURL = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`;
}

exports.connectToMongoose = async () => {
    let success = false
    while (!success) {
        try {
            if (process.env.NODE_ENV === 'production') {
                await mongoose.connect(DBURL, {
                    authSource: 'admin'
                });
            } else {
                await mongoose.connect(DBURL);
            }
            success = true
        } catch (err) {
            console.log('Error connecting to database, trying again soon');
            await new Promise(resolve => setTimeout(resolve, 1000));    
        }
    }
    console.log('Connected to the database');
}