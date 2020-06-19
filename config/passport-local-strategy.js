const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email', //name in schema
        passReqToCallback: true
    },
    function(req, email, password, done){
        //find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
             } //return no error wwith usernot found

            return done(null, user);//return no error with user

        });
    }

));

//serialise and  deserialise
//serialise means to decide which key to kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserialise uses from key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){console.log('Error in finding the user'); return done(err);}
        return done(null, user);
    });
});

//check ifuser is authenticated
passport.checkAuthentication = function(req, res, next){
    //if user is signed in then pass on the req to next function
    if(req.isAuthenticated()){
        return next();
    }
    //if not signedin
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user is current signedin user from the cookie
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;