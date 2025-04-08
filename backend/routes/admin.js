const { Router } = require("express");
const { adminAuth } = require("../middleware");
const adminRouter =  Router();
const {AdminModel} = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

adminRouter.post("/signup", async(req, res) => {
    
    const requiredBody = z.object ({
         email: z.string().email(),
         adminName: z.string().min(3).max(100),
         password: z.string().min(7).max(50),
    })

    let response = requiredBody.safeParse(req.body);

    if(!response.success) {
        res.status(401).json ({
            message: "Invalid format",
            error: response.error.message
        })
        return;
    }
    const email = req.body.email;
    const adminName = req.body.adminName;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 5);

    await AdminModel.create ({
        email: email,
        adminName: adminName,
        password: hashedPassword,
    })

    res.json ({
        message: "Signup succeded"
    })
});

adminRouter.post("/signin", async(req, res) => {

    const email = req.body.email;
    const pass = req.body.password;

    const admin = await AdminModel.findOne ({
        email: email
    })
    const validation = await bcrypt.compare(pass, admin.password);

    if(!validation) {
        res.status(404).json ({
            message: "Invalid password"
        })
        return;
    }
    else {
        const token = jwt.sign({
            id: admin._id.toString()
        }, process.env.JWT_ADMIN_SECRET);
        res.json({
            token: token
        })
    }
});

module.exports = adminRouter;
//adminRouter.use(adminAuth);