const { Router } = require("express");
const { adminAuth } = require("../middleware");
const adminRouter =  Router();
const {AdminModel, CricketModel, FootballModel, BasketballModel, CarromModel, KabaddiModel, BadmintonModel} = require("../db");
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
            message: "Password must be more than 7 characters",
        })
        return;
    }
    const email = req.body.email;
    const adminName = req.body.adminName;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 5);

   const resp =  await AdminModel.create ({
        email: email,
        adminName: adminName,
        password: hashedPassword,
    })
    console.log(resp)
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

adminRouter.use(adminAuth);

adminRouter.post('/cricket', async (req, res) => {

    const team1 = req.body.teamA;
    const team2 = req.body.teamB;
    const date = req.body.date;
    const startTime = req.body.startTime;

    const trying = await CricketModel.create({
        teamA: team1,
        teamB: team2,
        date: date,
        startTime: startTime
    })

    if(!trying) {
        res.status(403).json ({
            message: "Error adding match"
        })
    }

    res.json({
        message: "Match added sucessfully",
        matchId: trying._id
    })
});

adminRouter.post('/football', async(req, res) => {

    const team1 = req.body.teamA;
    const team2 = req.body.teamB;
    const date = req.body.date;
    const startTime = req.body.startTime;

    const adding = await FootballModel.create({
        teamA: team1,
        teamB: team2,
        date: date,
        startTime: startTime
    })

    if(!adding) {
        res.status(403).json ({
            message: "Error adding match"
        })
    }

    res.json({
        message: "Match added sucessfully",
        matchId: adding._id
    })
});

adminRouter.post('/badminton', async(req, res) => {

    const teamA = req.body.teamA;
    const teamB = req.body.teamB;
    const date = req.body.date;
    const startTime = req.body.startTime;


    const adding = await BadmintonModel.create({
        teamA: teamA,
        teamB: teamB,
        date: date,
        startTime: startTime
    })

    if(!adding) {
        res.status(403).json ({
            message: "Error adding match"
        })
    }

    res.json({
        message: "Match added sucessfully",
        matchId: adding._id
    })
});

adminRouter.post('/carrom', async(req, res) => {

    const player1 = req.body.teamA;
    const player2 = req.body.teamB;
    const date = req.body.date;
    const startTime = req.body.startTime;

    const adding = await CarromModel.create({
        teamA: player1,
        teamB: player2,

        date: date,
        startTime: startTime
    })

    if(!adding) {
        res.status(403).json ({
            message: "Error adding match"
        })
    }

    res.json({
        message: "Match added sucessfully",
        matchId: adding._id
    })
});

adminRouter.post('/basketball', async(req, res) => {

    const team1 = req.body.teamA;
    const team2 = req.body.teamB;
    const date = req.body.date;
    const startTime = req.body.startTime;

    const adding = await BasketballModel.create({
        teamA: team1,
        teamB: team2,
        date: date,
        startTime: startTime
    })

    if(!adding) {
        res.status(403).json ({
            message: "Error adding match"
        })
    }

    res.json({
        message: "Match added sucessfully",
        matchId: adding._id
    })
});

adminRouter.post('/kabaddi', async(req, res) => {

    const team1 = req.body.teamA;
    const team2 = req.body.teamB;
    const date = req.body.date;
    const startTime = req.body.startTime;

    const adding = await KabaddiModel.create({
        teamA: team1,
        teamB: team2,
        date: date,
        startTime: startTime
    })

    if(!adding) {
        res.status(403).json ({
            message: "Error adding match"
        })
    }

    res.json({
        message: "Match added sucessfully",
        matchId: adding._id
    })
});
  
module.exports = adminRouter;