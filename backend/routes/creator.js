import { Router } from "express";
import { adminAuth } from "../middleware.js";
import { CricketModel, FootballModel, BasketballModel, CarromModel, KabaddiModel, BadmintonModel } from "../db.js";
import mongoose from 'mongoose';

// creatorRouter.use(adminAuth);
const creatorRouter =  Router();

creatorRouter.get("/cricket",   async (req, res) => {

  let match = await CricketModel.find({
    status : "live"
  },{

  })

  if(match) {
    res.json({
      match: match
    })
  }
  else {
    res.status(404).json ({
      message: "Match not found"
    })
  }
})

creatorRouter.get("/football", async (req, res) => {

 
  let match = await FootballModel.findOne({
    status : "live"
  })

  if(match) {
    res.json({
      match: match
    })
  }
  else {
    res.status(404).json ({
      message: "Match not found"
    })
  }
})

creatorRouter.get("/basketball", async (req, res) => {

  const id = req.query.matchId;
  let match = await BasketballModel.findOne({
     status : "live"
  })

  if(match) {
    res.json({
     match: match
    })
  }
  else {
    res.status(404).json ({
      message: "Match not found"
    })
  }
})

creatorRouter.get("/badminton", async (req, res) => {

  const id = req.query.matchId;
  let match = await BadmintonModel.findOne({
     status : "live"
  })

  if(match) {
    res.json ({
      match: match
    })
  }
  else {
    res.status(404).json ({
      message: "Match not found"
    })
  }
})

creatorRouter.get("/kabaddi", async (req, res) => {

  const id = req.query.matchId;
  let match = await KabaddiModel.findOne({
     status : "live"
  })

  if(match) {
    res.json({
      match: match
    })
  }
  else {
    res.status(404).json ({
      message: "Match not found"
    })
  }
})

creatorRouter.get("/carrom", async (req, res) => {

  const id = req.query.matchId;
  let match = await CarromModel.findOne({
     status : "live"
  })

  if(match) {
    res.json({
      match: match
    })
  }
  else {
    res.status(404).json ({
      message: "Match not found"
    })
  }
})


creatorRouter.put('/badminton/:matchId', adminAuth ,  async (req, res) => {
    const matchId = req.params.matchId;
    const teamAPoint = req.body.teamAPoint;
    const teamBPoint = req.body.teamBPoint;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await BadmintonModel.findByIdAndUpdate(matchId, {
      teamAPoint, teamBPoint
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/cricket/:matchId', adminAuth , async (req, res) => {
    const matchId = req.params.matchId;
    const teamARuns = req.body.teamARuns;
    const teamAWickets = req.body.teamAWickets;
    const teamBRuns = req.body.teamBRuns;
    const teamBWickets = req.body.teamBWickets;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await CricketModel.findByIdAndUpdate(matchId, {
      teamARuns, teamBRuns, teamAWickets, teamBWickets
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/football/:matchId', adminAuth , async (req, res) => {
    const matchId = req.params.matchId;
    const teamAGoals = req.body.teamAGoals;
    const teamBGoals = req.body.teamBGoals;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await FootballModel.findByIdAndUpdate(matchId, {
      teamAGoals, teamBGoals
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/carrom/:matchId', adminAuth , async (req, res) => {
    const matchId = req.params.matchId;
    const player1Point = req.body.player1Point;
    const player2Point = req.body.player2Point;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await CarromModel.findByIdAndUpdate(matchId, {
      player1Point, player2Point
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/kabaddi/:matchId', adminAuth , async (req, res) => {
    const matchId = req.params.matchId;
    const teamAPoint = req.body.teamAPoint;
    const teamBPoint = req.body.teamBPoint;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await KabaddiModel.findByIdAndUpdate(matchId, {
      teamAPoint, teamBPoint
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/basketball/:matchId', adminAuth ,  async (req, res) => {
    const matchId = req.params.matchId;
    const teamAPoint = req.body.teamAPoint;
    const teamBPoint = req.body.teamBPoint;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await BasketballModel.findByIdAndUpdate(matchId, {
      teamAPoint, teamBPoint
    }, { new: true });
  
    res.json(updatedMatch);
});


creatorRouter.get("/filter/cricket", async (req, res) => {

  let matches = await CricketModel.find({
    status: "live"
  })

  if(matches) {
    res.json({
      matches: matches
    })
  }
  else {
    res.status(404).json ({
      message: "No live matches"
    })
  }
})

creatorRouter.get("/filter/football", async (req, res) => {

  let matches = await FootballModel.find({
    status: "live"
  })

  if(matches) {
    res.json({
      matches: matches
    })
  }
  else {
    res.status(404).json ({
      message: "No live matches"
    })
  }
})

creatorRouter.get("/filter/kabaddi", async (req, res) => {

  let matches = await KabaddiModel.find({
    status: "live"
  })

  if(matches) {
    res.json({
      matches: matches
    })
  }
  else {
    res.status(404).json ({
      message: "No live matches"
    })
  }
})

creatorRouter.get("/filter/carrom", async (req, res) => {

  let matches = await CarromModel.find({
    status: "live"
  })

  if(matches) {
    res.json({
      matches: matches
    })
  }
  else {
    res.status(404).json ({
      message: "No live matches"
    })
  }
})

creatorRouter.get("/filter/badminton", async (req, res) => {

  let matches = await BadmintonModel.find({
    status: "live"
  })

  if(matches) {
    res.json({
      matches: matches
    })
  }
  else {
    res.status(404).json ({
      message: "No live matches"
    })
  }
})

creatorRouter.get("/filter/basketball", async (req, res) => {

  let matches = await BasketballModel.find({
    status: "live"
  })

  if(matches) {
    res.json({
      matches: matches
    })
  }
  else {
    res.status(404).json ({
      message: "No live matches"
    })
  }
})

export default creatorRouter