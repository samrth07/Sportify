const express = require("express");
const cricketRouter = express.Router();
const badmintonRouter = express.Router();
const footballRouter = express.Router();
const carromRouter = express.Router();
const kabaddiRouter = express.Router();
const basketballRouter = express.Router();
const { CricketModel, 
    FootballModel, 
    BasketballModel, 
    CarromModel, 
    KabaddiModel, 
    BadmintonModel
    } = require("../db");

cricketRouter.get('/live', async (req, res) => {
    try {
      const matches = await CricketModel.find({
        status: 'live'
      }).sort({ 
        startTime: -1
     }); // recent live 
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching live matches' 
    });
    }
  });
  
  // 🔵 Upcoming Cricket 
  cricketRouter.get('/upcoming', async (req, res) => {
    try {
      const now = new Date();
      const matches = await CricketModel.find({
        status: 'upcoming',
        startTime: { $gte: now }
      }).sort({ 
        startTime: 1
     }); // soonest first
      res.json(matches);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching upcoming matches' });
    }
  });
  
  cricketRouter.get('/recent', async (req, res) => {
    try {
      const matches = await CricketModel.find({
        status: 'completed'
      }).sort({ 
        startTime: -1 
    }); // most recently finished
      res.json(matches);
    }
     catch (error) {
      res.status(500).json({ error: 'Error fetching completed matches' });
    }
  });

  //FOOTBALL 

  footballRouter.get('/live', async (req, res) => {
    try {
      const matches = await FootballModel.find({
        status: 'live'
      }).sort({ 
        startTime: -1
     }); // recent live 
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching live matches' 
    });
    }
  });
  
  // 🔵 Upcoming Matches
  footballRouter.get('/upcoming', async (req, res) => {
    try {
      const now = new Date();
      const matches = await FootballModel.find({
        status: 'upcoming',
        startTime: { $gte: now }
      }).sort({ 
        startTime: 1
     }); // soonest first
      res.json(matches);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching upcoming matches' });
    }
  });
  
  footballRouter.get('/recent', async (req, res) => {
    try {
      const matches = await FootballModel.find({
        status: 'completed'
      }).sort({ 
        startTime: -1 
    }); // most recently finished
      res.json(matches);
    }
     catch (error) {
      res.status(500).json({ error: 'Error fetching completed cricket matches' });
    }
  });

  //BASKETBALL

  basketballRouter.get('/live', async (req, res) => {
    try {
      const matches = await BasketballModel.find({
        status: 'live'
      }).sort({ 
        startTime: -1
     }); // recent live 
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching live matches' 
    });
    }
  });
  
  // 🔵 Upcoming Matches
  basketballRouter.get('/upcoming', async (req, res) => {
    try {
      const now = new Date();
      const matches = await BasketballModel.find({
        status: 'upcoming',
        startTime: { $gte: now }
      }).sort({ 
        startTime: 1
     }); // soonest first
      res.json(matches);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching upcoming matches' });
    }
  });
  
  basketballRouter.get('/recent', async (req, res) => {
    try {
      const matches = await BasketballModel.find({
        status: 'completed'
      }).sort({ 
        startTime: -1 
    }); // most recently finished
      res.json(matches);
    }
     catch (error) {
      res.status(500).json({ error: 'Error fetching completed matches' });
    }
  });

  //KABADDI

  kabaddiRouter.get('/live', async (req, res) => {
    try {
      const matches = await KabaddiModel.find({
        status: 'live'
      }).sort({ 
        startTime: -1
     }); // recent live 
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching live matches' 
    });
    }
  });
  
  // 🔵 Upcoming Matches
  kabaddiRouter.get('/upcoming', async (req, res) => {
    try {
      const now = new Date();
      const matches = await KabaddiModel.find({
        status: 'upcoming',
        startTime: { $gte: now }
      }).sort({ 
        startTime: 1
     }); // soonest first
      res.json(matches);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching upcoming matches' });
    }
  });
  
  kabaddiRouter.get('/recent', async (req, res) => {
    try {
      const matches = await KabaddiModel.find({
        status: 'completed'
      }).sort({ 
        startTime: -1 
    }); // most recently finished
      res.json(matches);
    }
     catch (error) {
      res.status(500).json({ error: 'Error fetching completed  matches' });
    }
  });

  //CARROM

  carromRouter.get('/live', async (req, res) => {
    try {
      const matches = await CarromModel.find({
        status: 'live'
      }).sort({ 
        startTime: -1
     }); // recent live 
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching live cricket matches' 
    });
    }
  });
  
  // 🔵 Upcoming Matches
  carromRouter.get('/upcoming', async (req, res) => {
    try {
      const now = new Date();
      const matches = await CarromModel.find({
        status: 'upcoming',
        startTime: { $gte: now }
      }).sort({ 
        startTime: 1
     }); // soonest first
      res.json(matches);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching upcoming matches' });
    }
  });
  
  carromRouter.get('/recent', async (req, res) => {
    try {
      const matches = await CarromModel.find({
        status: 'completed'
      }).sort({ 
        startTime: -1 
    }); // most recently finished
      res.json(matches);
    }
     catch (error) {
      res.status(500).json({ error: 'Error fetching completed matches' });
    }
  });

    //BADMINTON

  badmintonRouter.get('/live', async (req, res) => {
    try {
      const matches = await BadmintonModel.find({
        status: 'live'
      }).sort({ 
        startTime: -1
     }); // recent live 
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching live matches' 
    });
    }
  });
  
  // 🔵 Upcoming Matches
  badmintonRouter.get('/upcoming', async (req, res) => {
    try {
      const now = new Date();
      const matches = await BadmintonModel.find({
        status: 'upcoming',
        startTime: { $gte: now }
      }).sort({ 
        startTime: 1
     }); // soonest first
      res.json(matches);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching upcoming matches' });
    }
  });
  
  badmintonRouter.get('/recent', async (req, res) => {
    try {
      const matches = await BadmintonModel.find({
        status: 'completed'
      }).sort({ 
        startTime: -1 
    }); // most recently finished
      res.json(matches);
    }
     catch (error) {
      res.status(500).json({ error: 'Error fetching completed matches' });
    }
  });
  
  module.exports = {cricketRouter, carromRouter, footballRouter, badmintonRouter, basketballRouter, kabaddiRouter};

