const { Router } = require("express");
const { userAuth } = require("../middleware");
const userRouter = Router();
const { UserModel, CourseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
     const requiredBody = z.object ({
             email: z.string().email(),
             userName: z.string().min(3).max(100),
             password: z.string().min(7).max(50),
        })

        let response = requiredBody.safeParse(req.body);
    
        if(!response.success) {
            res.status(401).json ({
                message: "Invalid format",
                error: response.error.message,
            })
            return;
        }
            const email = req.body.email;
            const userName = req.body.userName;
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 5);
    
            await UserModel.create ({
                email: email,
                userName: userName,
                password: hashedPassword,
            });

            res.json({
                message: "signup succeded"
            })
});

userRouter.post("/signin", async (req, res) => {

    const email = req.body.email;
    const pass = req.body.password;
    
        const user = await UserModel.findOne ({
            email: email
        })
        const validation = await bcrypt.compare(pass, user.password);
    
        if(!validation) {
            res.status(404).json ({
                message: "Invalid password"
            })
            return;
        }
        else {
            const token = jwt.sign({
                id: user._id.toString()
            }, process.env.JWT_USER_SECRET);
            res.json({
                token: token
            })
        }
});

module.exports = userRouter;
// userRouter.use(userAuth);
