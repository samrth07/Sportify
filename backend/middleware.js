const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {

    const token = req.headers.token;

    if(token) {
        let validUser = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

        if(validUser) {
            let admin = AdminModel.findOne ({
                adminId: id,
            })

            if(admin) {
                req.adminId = validUser.id,
                next();
            }
            else {
                req.status(403).json ({
                    mesage: "You're trying to access something you're not supposed to :)"
                })
            }
        }
        else {
            res.status(403).json ({
                message: "Access not allowed"
            })
        }
    }
    else {
        res.status(404).json ({
            message: "Error reading token"
        })
    }
}


const userAuth = async (req, res, next) => {

    const token = req.headers.token;

    if(token) {

        let validUser = jwt.verify(token, process.env.JWT_USER_SECRET);
        if(validUser) {

            if(user) {
                req.userId = validUser.id;
                next();
            }else {
                res.status(401).json ({
                    message: "Access denied"
                })
            }
        }
        else {
            res.status(403).json ({
                message: "No such user found"
            })
        }
    }
    else {
        res.status(404).json ({
            message: "Error reading token"
        })
    }
}
module.exports = {adminAuth, userAuth};