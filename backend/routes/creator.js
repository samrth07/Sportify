const { Router } = require("express");
const { adminAuth } = require("../middleware");
const creatorRouter =  Router();
const { CricketModel, FootballModel, BasketballModel, CarromModel, KabaddiModel, BadmintonModel } = require("../db");
const mongoose = require('mongoose');

// creatorRouter.use(adminAuth);

creatorRouter.put('/badminton', async (req, res) => {
    const matchId = req.query.matchId;
    const teamAGoals = req.body.teamAGoals;
    const teamBGoals = req.body.teamBGoals;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await BadmintonModel.findByIdAndUpdate(matchId, {
      teamAGoals, teamBGoals
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/cricket', async (req, res) => {
    const matchId = req.query.matchId;
    const teamARuns = req.body.teamAGoals;
    const teamAWickets = req.body.teamAWickets;
    const teamBRuns = req.body.teamBGoals;
    const teamBWickets = req.body.teamBWickets;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await CricketModel.findByIdAndUpdate(matchId, {
      teamARuns, teamBRuns, teamAWickets, teamBWickets
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/football', async (req, res) => {
    const matchId = req.query.matchId;
    const teamAGoals = req.body.teamAGoals;
    const teamBGoals = req.body.teamBGoals;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await FootballModel.findByIdAndUpdate(matchId, {
      teamAGoals, teamBGoals
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/carrom', async (req, res) => {
    const matchId = req.query.matchId;
    const teamAGoals = req.body.teamAGoals;
    const teamBGoals = req.body.teamBGoals;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await CarromModel.findByIdAndUpdate(matchId, {
      teamAGoals, teamBGoals
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/kabaddi', async (req, res) => {
    const matchId = req.query.matchId;
    const teamAGoals = req.body.teamAGoals;
    const teamBGoals = req.body.teamBGoals;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await KabaddiModel.findByIdAndUpdate(matchId, {
      teamAGoals, teamBGoals
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.put('/basketball', async (req, res) => {
    const matchId = req.query.matchId;
    const teamAGoals = req.body.teamAGoals;
    const teamBGoals = req.body.teamBGoals;

    if (!mongoose.Types.ObjectId.isValid(matchId))
         return res.status(400).json({ error: 'Invalid ID' });
  
    const updatedMatch = await BasketballModel.findByIdAndUpdate(matchId, {
      teamAGoals, teamBGoals
    }, { new: true });
  
    res.json(updatedMatch);
});

creatorRouter.get("/cricket", async (req, res) => {

  const id = req.query.matchId;
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

  const id = req.query.matchId;
  let match = await FootballModel.findOne({
    _id: id
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
    _id: id
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
    _id: id
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
    _id: id
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
    _id: id
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

module.exports = creatorRouter