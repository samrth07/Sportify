const { Router } = require("express");
const { adminAuth } = require("../middleware");
const creatorRouter =  Router();
const { CricketModel, FootballModel, BasketballModel, CarromModel, KabaddiModel, BadmintonModel } = require("../db");
const mongoose = require('mongoose');

// creatorRouter.use(adminAuth);

creatorRouter.put('/live/badminton', async (req, res) => {
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

creatorRouter.put('/live/cricket', async (req, res) => {
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

creatorRouter.put('/live/football', async (req, res) => {
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

creatorRouter.put('/live/carrom', async (req, res) => {
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

creatorRouter.put('/live/kabaddi', async (req, res) => {
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

creatorRouter.put('/live/basketball', async (req, res) => {
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

module.exports = creatorRouter