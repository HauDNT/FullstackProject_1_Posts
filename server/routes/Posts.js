const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/AuthenMiddleware');
const PostsController = require('../controllers/PostsController');

router.get('/', validateToken, PostsController.getListOfPosts);
router.get('/:id', PostsController.getPostById);
router.get('/userId/:userId', PostsController.getPostByUserId);
router.post('/', validateToken, PostsController.createNewPost);
router.delete('/:postId', validateToken, PostsController.deletePost);

module.exports = router;