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

// Data -> Post -> Go to validTokenMiddleware to check Token User -> (OK) Continue processing...
router.post('/', validateToken, async (req, res) => {
    const comment = req.body;

    // Lấy username mà người dùng đã thực hiện comment và thêm thuộc tính này vào
    // đối tượng 'comment':
    const usernameCommented = req.user.username;
    comment.username = usernameCommented;

    await Comments.create(comment);
    res.json(comment);
});

// Hàm xóa comment:
router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        }
    });

    res.json("Deleted comment!");   // Xóa xong thì trả về response để client cập nhật trạng thái
});

module.exports = router;