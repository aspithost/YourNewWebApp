const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authHashSchema = new Schema({
    authHash: {
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

const AuthHash = mongoose.model('AuthHash', authHashSchema);

module.exports = AuthHash