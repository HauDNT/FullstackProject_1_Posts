const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken)
        return res.json({error: "User not logged in!"});
    
    try {
        const validToken = verify(accessToken, "importantsecret");
        console.log("Valid token: ", validToken);

        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({error: err});
        // console.error("Error in validateToken middleware:", err);
        // return res.json({ error: "Invalid token" });
    }
};

module.exports = {validateToken};