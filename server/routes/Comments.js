const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const {validateToken} = require('../middlewares/AuthenMiddleware');
// Require thuộc tính validateToken đã được tạo và xuất từ AuthenMiddleware

router.get('/:postId', async(req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({where: {PostId: postId}});
    res.json(comments);
});

const app = express();

// Data -> Post -> Go to validTokenMiddleware to check Token User -> (OK) Continue processing...
router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;