const { Comments } = require('../models');

class CommentsController {
    async getCommentsOfPost(req, res) {
        const postId = req.params.postId;
        const comments = await Comments.findAll({where: {PostId: postId}});
        res.json(comments);
    };

    async createNewComment(req, res) {
        const comment = req.body;

        // Lấy username mà người dùng đã thực hiện comment và thêm thuộc tính này vào
        // đối tượng 'comment':
        const usernameCommented = req.user.username;
        comment.username = usernameCommented;
    
        await Comments.create(comment);
        res.json(comment);
    };

    async deleteComment(req, res) {
        const commentId = req.params.commentId;

        await Comments.destroy({
            where: {
                id: commentId,
            }
        });
    
        res.json("Deleted comment!");   // Xóa xong thì trả về response để client cập nhật trạng thái
    }
}

module.exports = new CommentsController();