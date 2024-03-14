const { Posts, Likes } = require('../models');

class PostsController {
    async getListOfPosts(req, res) {
        const listOfPosts = await Posts.findAll({include: [Likes]});
        res.json(listOfPosts);
    };

    async getPostById(req, res) {
        const postId = req.params.id;
        const thisPost = await Posts.findByPk(postId);
        res.json(thisPost);
    };

    async createNewPost(req, res) {
        const post = req.body;
        await Posts.create(post);
        res.json(post);
    };
}

module.exports = new PostsController();