const jwt = require("jsonwebtoken");
const { AdminModel } = require("./db");
const adminAuth = async (req, res, next) => {

    const token = req.headers.token;

    if(token) {
        let validUser = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

        if(validUser) {
            next();
        }
        else {
            res.status(403).json ({
                mesage: "You're trying to access something you're not supposed to :)"
            })
        }
    }
    else {
        res.status(404).json ({
            message: "Error reading token"
        })
    }
}

module.exports = {adminAuth};