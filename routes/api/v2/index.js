const express = require('express');

//create router for diff routes using expressrouter
const router = express.Router();

router.use('/posts', require('./posts'));


module.exports = router;