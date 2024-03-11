const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

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
        res.json("Login failed! Check your account and try again!");
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) res.json("Password isn't correct!");
            else res.json("Login success!");
        });
    }
});

module.exports = router;