const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/LikesController');
const {validateToken} = require('../middlewares/AuthenMiddleware');

router.post('/',validateToken, LikesController.test);

module.exports = router;