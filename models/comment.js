const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    //comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    }
},{
    timestamps: true
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
//change in posts to fetch comments in each posts so add a ref to there 