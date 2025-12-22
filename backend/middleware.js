import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {

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
        res.status(500).json ({
            message: "Error reading token"
        })
    }
}

