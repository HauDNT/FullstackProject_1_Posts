const express = require('express');
const router = express.Router();
const ProfilesController = require('../controllers/ProfilesController');

router.get('/:id', ProfilesController.getProfile);

module.exports = router;
