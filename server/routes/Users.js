const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');     // Using Json Web Token
const {validateToken} = require('../middlewares/AuthenMiddleware');

// Register:
router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json(req.body);
    });
});

// Login:
router.post('/login', async (req, res) => {
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
                
            res.json({token: accessToken, username: username, id: user.id});  // Give token to json data
        });
    }
});

// Kiểm tra token có hợp lệ hay không (giả hay thật)
// Trả về thông tin của người dùng đăng nhập:
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

// Logout
// router.get('/logout', () => {
//     sessionStorage.removeItem("accessToken");
//     const [authState, setAuthState] = useState(false);
//     setAuthState(false);
// });

module.exports = router;