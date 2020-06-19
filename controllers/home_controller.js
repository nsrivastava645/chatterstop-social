const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

    try{    
        //populate userof each post
        let posts = await Post.find({}) //await keyword waits for the current request to execute then go to next
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({})
        return res.render('home', {
            title: "CHATTERSTOP | Home",
            posts : posts,
            all_users: users
        });


    }catch(err){
        console.log('Error', err);
        return;

    }


}

