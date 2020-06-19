const express = require('express');
const env = require('./config/environment');
//for cookies
const cookieParser = require('cookie-parser');
//end cookie
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const db  = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
//sass
const sassMiddleware = require('node-sass-middleware');
//flash messages use  it in session 
const flash = require('connect-flash');
//our middleware handling coonnect and logout request and responses
const customMware = require('./config/middleware');


//for static paths
const path = require('path');
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, '/scss'),
    dest: path.join(__dirname, env.asset_path, '/css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));
//use the cookie parser
app.use(cookieParser());

//reading through post requests
app.use(express.urlencoded());

//add layout to your index.js
app.use(expressLayouts);

//for css styling of each view file and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//and add <%- style %> in the layout ejs file

//adding static files
app.use(express.static(env.asset_path));

//for avatar images acessible from th euploads folder
app.use('/uploads', express.static(__dirname+'/uploads'));
//any app will use the routes index file then index of routes filewill use middleware to route to its neighbours using router.use method


//setting up views engine


//setting the view engine
app.set('view engine', 'ejs');

//set views directory
app.set('views','./views');


//using the encryptor for session cookie
//mongo store forsession cookie storage
app.use(session({
    name : 'codeial',
    //TODO change the secret before deployment on server
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove: 'disabled'
        }, 
        function(err){
            console.log(err || 'connect=mongodb setup okay');
        }
        
        )

}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

//using the flash message
app.use(flash());

//use custom middleware
app.use(customMware.setFlash);

//use the express router 
app.use('/', require('./routes'));//by default fetches routes/index

//add listener on this port 
app.listen(port,/*callback*/function(err){
    if(err){
        //using interpolation notation this button `~
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
}); 
 