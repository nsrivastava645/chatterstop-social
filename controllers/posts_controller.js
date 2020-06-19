const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user//ak baar run krna
        });
        
        if(req.xhr){
            
            return res.status(200).json({//yr placement to sahi h req.flash ki achaa
                data: {
                    post: post
                },
                message: "Post Created!"//bakio ma noy aa rha h ruko ek chiz dekho//posts to theek se ho rhi h noty or kisi ma aarha h?noty pehle aara tha par abhi refresh pe aata sirf aise
            });
        }

        req.flash('success',`Post Published by: ${req.user}`);
        return res.redirect('back');

    } 
    catch (err) {
        req.flash('error',"Error");
        return ;
    }

}

module.exports.destroy = async function(req, res){
   
    try {
        let post = await Post.findById(req.params.id);
        let p_user = req.user;
    if(post.user == req.user.id){
        post.remove();
        //delete the comments associated with the post check where post: req.params.id
        await Comment.deleteMany({post: req.params.id});

        //for ajax request check
        if(req.xhr){
            
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post Deleted !"
            });
        }
        
        req.flash('delete', `Post Deleted with all comments by: ${p_user.name}`);//ye shi to h but ye dekho

        return res.redirect('back');
    } else{
        req.flash('error', "Not authorized to delete the post");
        return res.redirect('back');
    }
    } catch (err) {
        req.flash('error',"Error");
        return res.redirect('back') ;
    }
    
}