import express from "express";
const sportRouter = express.Router();

import { CricketModel, 
    FootballModel, 
    BasketballModel, 
    CarromModel, 
    KabaddiModel, 
    BadmintonModel
    } from "../db.js";

  sportRouter.get('/cricket', async (req, res) => {
    try {
      const matches = await CricketModel.find({});
      res.json({
        matches:matches
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching matches' 

    });
  }
});

  //FOOTBALL 

  sportRouter.get('/football', async (req, res) => {
    try {
      const matches = await FootballModel.find({});
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching matches' 
    });
    }
  });
  
  //BASKETBALL

  sportRouter.get('/basketball', async (req, res) => {
    try {
      const matches = await BasketballModel.find({});
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching matches' 
    });
    }
  });
  
  //KABADDI

  sportRouter.get('/kabaddi', async (req, res) => {
    try {
      const matches = await KabaddiModel.find({});
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching matches' 
    });
    }
  });

  //CARROM

  sportRouter.get('/carrom', async (req, res) => {
    try {
      const matches = await CarromModel.find({});
      res.json(matches);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching matches' 
    });
    }
  });

    //BADMINTON

    sportRouter.get('/badminton', async (req, res) => {
      try {
        const matches = await BadmintonModel.find({});
        res.json(matches);
      } catch (error) {
        res.status(500).json({ 
          error: 'Error fetching matches' 
      });
      }
    });
    
export default sportRouter

