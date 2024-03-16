const { Posts, Likes } = require('../models');

class PostsController {
    async getListOfPosts(req, res) {
        const listOfPosts = await Posts.findAll({include: [Likes]});
        const likedPosts = await Likes.findAll({where: {UserId: req.user.id}});

        res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
    };

    async getPostById(req, res) {
        const postId = req.params.id;
        const thisPost = await Posts.findByPk(postId);
        res.json(thisPost);
    };

    async createNewPost(req, res) {
        const post = req.body;
        post.username = req.user.username;
        await Posts.create(post);
        res.json(post);
    };

    async deletePost(req, res) {
        const postId = req.params.postId;
        
        await Posts.destroy({
            where: {
                id: postId,
            },
        });

        res.json({ message: "DELETED POST" + postId });
    }
}

module.exports = new PostsController();