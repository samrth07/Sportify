const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/signup", async(req, res) => {
    
    const requiredBody = z.object ({
         email: z.string().email(),
         userName: z.string().min(3).max(100),
         password: z.string().min(7).max(50),
    })

    let response = requiredBody.safeParse(req.body);

    if(!response.success) {
        res.status(401).json ({
            message: "Password must be more than 7 characters",
        })
        return;
    }
    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 5);

    await CommunityModel.create ({
        email: email,
        userName: userName,
        password: hashedPassword,
    })

    res.json ({
        message: "Signup succeded"
    })
});

userRouter.post("/signin", async(req, res) => {

    const email = req.body.email;
    const pass = req.body.password;

    const user = await CommunityModel.findOne ({
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