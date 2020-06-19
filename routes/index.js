const express = require('express');

//create router for diff routes using expressrouter
const router = express.Router();

//get the controller file loaded
const homeController = require('../controllers/home_controller');

//check for loaded or not
console.log("Router loaded");

//using the controller 
router.get('/', homeController.home);
//for other routes than home proceed below
//for a users request or route use the users routing file
router.use('/users', require('./users'));

//route for posts will be handled by this
router.use('/posts', require('./posts'));

//router for comments
router.use('/comments', require('./comments'));

//using apis
router.use('/api', require('./api'));

//make it available outside here
module.exports = router; 

