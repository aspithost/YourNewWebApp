const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema ({
    blogId: {
        type: Number,
        unique: true,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'SingleComment'
    }]
});

const Comments = mongoose.model('CommentInstance', commentsSchema);

module.exports = Comments