const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');     // Using Json Web Token
const LocalStorage = require('node-localstorage').LocalStorage;

class UsersController {
    localStorage = new LocalStorage('./scratch');

    async register(req, res) {
        const {username, password} = req.body;
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
            });
            res.json(req.body);
        });
    };

    async login(req, res) {
        const {username, password} = req.body;

        // Query account in DB:
        const user = await Users.findOne({where: {username: username}});
        if (!user) 
            res.json({error: "Login failed! Check your account and try again!"});
        else {
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) res.json({error: "Password isn't correct!"});
    
                const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
                    // Generate encrypt string accessToken
                    // "importantsecret" will give in AuthenMiddleware to check the accessToken!
                    
                return res.json({token: accessToken, username: username, id: user.id});  // Give token to json data
            });
        }
    };

    async authenToken(req, res) {
        res.json(req.user);

        // Nếu token vượt qua lớp kiểm tra 'validateToken' thì
        // sẽ chạy vào hàm này để server trả về thông tin user đăng nhập
    };
}

module.exports = new UsersController();