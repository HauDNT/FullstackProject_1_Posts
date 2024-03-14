const {Likes} = require('../models');

class LikesController {
    async test(req, res) {
        const PostId = req.query.PostId;
        const UserId = req.user.id;

        const found = await Likes.findOne({
            where: {PostId: PostId, UserId: UserId}
        });

        if (!found) {
            await Likes.create({PostId: PostId, UserId: UserId});
            res.json("Liked the Post");
        } else {
            await Likes.destroy({where: {PostId: PostId, UserId: UserId}});
            res.json("Unliked the Post");
        }
    }
}

module.exports = new LikesController();