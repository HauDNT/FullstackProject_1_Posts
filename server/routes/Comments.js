const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/AuthenMiddleware');
const CommentsController = require('../controllers/CommentsController');

router.get('/:postId', CommentsController.getCommentsOfPost);
router.post('/', validateToken, CommentsController.createNewComment);
router.delete('/:commentId', CommentsController.deleteComment);

module.exports = router;