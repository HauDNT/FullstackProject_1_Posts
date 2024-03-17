const { Users } = require('../models');

class ProfilesController {
    async getProfile (req, res) {
        const id = req.params.id;
        const basicInfo = await Users.findByPk(id, {attributes: {exclude: ['password']}});
    
        res.json(basicInfo);
    }
}

module.exports = new ProfilesController();
