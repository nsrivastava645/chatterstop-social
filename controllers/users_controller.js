const User = require('../models/user');
const fs = require('fs');
const path = require('path');
//controller for many users

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
}

//update the profile
module.exports.update = async function(req, res){
    //check current user is the user whose profileis being changed
    // if(req.user.id ==  req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id ==  req.params.id){

        try {
            let user  = await  User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Error in multer', err);
                }
                
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    //check if an avatar is associated with the user and if yes then delete it
                    //we will need filesystem for that so import fs
                    if(user.avatar){
                        fs.writeFileSync(path.join(__dirname, '..', user.avatar));
                    }

                    //storing the filename in users database with key as avatar
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', "Updated details");
                return res.redirect('back');

            })
            
        } catch (err) {
            req.flash('error',"Error");
            return res.redirect('back') ;
        }

    }else{
        req.flash('error', "Unauthorized");
        return res.status(401).send('Unauthorized');
    }
}

//renders the sign up or create accounts page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }



    return res.render('user_sign_up', {
        title: "CODEIAL | Sign Up"
    });
}


//renders the login page for existing users
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return   res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "CODEIAL | Log In"
    });
}


//for creating an account getting the signup data
module.exports.create = function(req, res){
    //check if password and confirm pwd are same
    console.log(res.cookie)
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //if same then check the db model for already present username
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding the user in signing up'); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in finding the user in signing up'); return;}
                return res.redirect('/users/sign-in');
            });
        }else{
            req.flash('success', `user with username:${req.body.email} already exists`);
            return res.redirect('back');
        }

    });

}

//for logging in and creating a session
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out of the session');
    return res.redirect('/');
}