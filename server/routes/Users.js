const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/AuthenMiddleware');
const UsersController = require('../controllers/UsersController');

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.get('/auth', validateToken, UsersController.authenToken);

module.exports = router;