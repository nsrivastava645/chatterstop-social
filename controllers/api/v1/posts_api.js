const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    let posts = await Post.find({}) 
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts,
    })
}

module.exports.destroy = async function(req, res){
   
    try {
        let post = await Post.findById(req.params.id);
        // let p_user = req.user;
    if(post.user == req.user.id){
        post.remove();
        //delete the comments associated with the post check where post: req.params.id
        await Comment.deleteMany({post: req.params.id});

        //for ajax request check
        
        //req.flash('delete', `Post Deleted with all comments by: ${p_user.name}`);//ye shi to h but ye dekho

        return res.json(200, {
            message: "post and comments associated deleted"
        });
    } else{
            return res.json(401, {
                message: "Unauthorized, you cannot delete this post!"
            })
    }
    } catch (err) {
        //req.flash('error',"Error");
        console.log(err);
        return res.json(500, {
            message: "Internal server error",
        });
    }
    
}