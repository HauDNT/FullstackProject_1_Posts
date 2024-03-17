const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/AuthenMiddleware');
const PostsController = require('../controllers/PostsController');

router.get('/', validateToken, PostsController.getListOfPosts);
router.get('/:id', PostsController.getPostById);
router.get('/userId/:userId', PostsController.getPostByUserId);
router.post('/', validateToken, PostsController.createNewPost);
router.put('/title', validateToken, PostsController.editPostTitle);
router.put('/postText', validateToken, PostsController.editPostText);
router.delete('/:id', validateToken, PostsController.deletePost);

module.exports = router;