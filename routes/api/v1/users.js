const express = require('express');

//create router for diff routes using expressrouter
const router = express.Router();

const userApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', userApi.createSession);

module.exports = router;