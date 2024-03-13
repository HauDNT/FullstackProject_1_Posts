const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/AuthenMiddleware');
const PostsController = require('../controllers/PostsController');

router.get('/', PostsController.getListOfPosts);
router.get('/:id', PostsController.getPostById);
router.post('/', validateToken, PostsController.createNewPost);

module.exports = router;