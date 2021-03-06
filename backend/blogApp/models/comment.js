const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    banned: {
        type: Boolean,
        default: false
    },
    blogId: {
        type: Number,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'SingleComment'        
    }],
    userId: {
        type: String,
        required: true
    },  
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('SingleComment', commentSchema);

module.exports = Comment