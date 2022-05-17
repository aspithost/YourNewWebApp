const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseSequence = require('mongoose-sequence')(mongoose);

const blogSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    disableComments: {
        type: Boolean,
        default: false  
    },
    featured: {
        type: Number,
        index: true,
    },
    id: {
        type: Number,
        unique: true
    },
    image: {
        type: String
    },
    imageSmall: {
        type: String
    },
    imageAttribution: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: true,
        required: true
    },
    language: {
        type: String,
        default: 'English'
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    thumbnail: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    twitterThumbnail: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
}, { timestamps: true });

blogSchema.index({ publishDate: -1, isPublished: 1 });

blogSchema.plugin(mongooseSequence, { inc_field: 'id' });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog