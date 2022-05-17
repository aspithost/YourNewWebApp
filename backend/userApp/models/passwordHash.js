const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordHashSchema = new Schema({
    passwordHash: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400,
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const PasswordHash = mongoose.model('PasswordHash', passwordHashSchema);

module.exports = PasswordHash