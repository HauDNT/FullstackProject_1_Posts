const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validToken } = require('../middlewares/AuthenMiddleware');

router.get('/:postId', async(req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({where: {PostId: postId}});
    res.json(comments);
});

// Data -> Post -> Go to validTokenMiddleware to check Token User -> (OK) Continue processing...
router.post('/', validToken, async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;