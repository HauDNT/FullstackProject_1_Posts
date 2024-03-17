const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');     // Using Json Web Token
const LocalStorage = require('node-localstorage').LocalStorage;

class UsersController {
    localStorage = new LocalStorage('./scratch');

    async register(req, res) {
        try {
            const {username, password} = req.body;
            bcrypt.hash(password, 10).then((hash) => {
                Users.create({
                    username: username,
                    password: hash,
                });
                return res.json(req.body);
            });
        } catch (error) {
            return res.json({ error: "Lỗi từ máy chủ. Hãy thử lại sau!" });
        }
    };

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await Users.findOne({where: {username: username}});
            
            // Query account in DB:
            if (!user) 
                return res.json({error: "Đăng nhập thất bại! Hãy kiểm tra lại thông tin."});

            const match = await bcrypt.compare(password, user.password);
            if (!match) 
                return res.json({ error: "Mật khẩu không đúng!" });

            const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
            // Generate encrypt string accessToken
            // "importantsecret" will give in AuthenMiddleware to check the accessToken!
                
            return res.json({token: accessToken, username: username, id: user.id});  // Give token to json data
        } catch (error) {
            return res.json({ error: "Lỗi từ máy chủ. Hãy thử lại sau!" });
        }
    };

    async authenToken(req, res) {
        res.json(req.user);

        // Nếu token vượt qua lớp kiểm tra 'validateToken' thì
        // sẽ chạy vào hàm này để server trả về thông tin user đăng nhập
    };

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await Users.findOne({ where: { username: req.user.username } });
    
            if (!user) {
                return res.json({ error: "Không có người dùng này" });
            }
    
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                return res.json({ error: "Sai mật khẩu cũ" });
            }
    
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await Users.update(
                { password: hashedPassword },
                { where: { username: req.user.username } }
            );
    
            res.json({ message: "Cập nhật mật khẩu thành công" });
        } catch (error) {
            res.json({ error: "Lỗi từ máy chủ. Hãy thử lại sau!" });
        }
    }
    
}

module.exports = new UsersController();