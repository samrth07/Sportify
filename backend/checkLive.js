const {CricketModel, FootballModel, BasketballModel, CarromModel, KabaddiModel, BadmintonModel} = require("../db");

// Runs every minute
const checkMatchesToGoLiveCricket = async () => {

  const now = new Date().setMilliseconds(0);
  const matchesToGoLive = await CricketModel.find({
    status: 'upcoming',
    startTime: { $lte: now }
  });

  for (let match of matchesToGoLive) {
    match.status = 'live';
    await match.save();
    console.log(`Match "${match.teamA} vs ${match.teamB}" started.`);
  }
};

const checkMatchesToGoLiveFootball = async () => {
    const now = new Date().setMilliseconds(0);
    const matchesToGoLive = await FootballModel.find({
      status: 'upcoming',
      startTime: { $lte: now }
    });
  
    for (let match of matchesToGoLive) {
      match.status = 'live';
      await match.save();
      console.log(`Match "${match.teamA} vs ${match.teamB}" started.`);
    }
};

const checkMatchesToGoLiveBasketball = async () => {
    const now = new Date().setMilliseconds(0);
    const matchesToGoLive = await BasketballModel.find({
      status: 'upcoming',
      startTime: { $lte: now }
    });
  
    for (let match of matchesToGoLive) {
      match.status = 'live';
      await match.save();
      console.log(`Match "${match.teamA} vs ${match.teamB}" started.`);
    }
};

const checkMatchesToGoLiveCarrom = async () => {
    const now = new Date().setMilliseconds(0);
    const matchesToGoLive = await CarromModel.find({
      status: 'upcoming',
      startTime: { $lte: now }
    });
  
    for (let match of matchesToGoLive) {
      match.status = 'live';
      await match.save();
      console.log(`Match "${match.teamA} vs ${match.teamB}" started.`);
    }
};

const checkMatchesToGoLiveBadminton = async () => {
    const now = new Date().setMilliseconds(0);
    const matchesToGoLive = await BadmintonModel.find({
      status: 'upcoming',
      startTime: { $lte: now }
    });
  
    for (let match of matchesToGoLive) {
      match.status = 'live';
      await match.save();
      console.log(`Match "${match.teamA} vs ${match.teamB}" started.`);
    }
};

const checkMatchesToGoLiveKabaddi = async () => {
    const now = new Date();
    const matchesToGoLive = await KabaddiModel.find({
      status: 'upcoming',
      startTime: { $lte: now }
    });
  
    for (let match of matchesToGoLive) {
      match.status = 'live';
      await match.save();
      console.log(`Match "${match.teamA} vs ${match.teamB}" started.`);
    }
};

// setInterval(checkMatchesToGoLiveCricket, 10 * 1000);
// setInterval(checkMatchesToGoLiveFootball, 10 * 1000);
// setInterval(checkMatchesToGoLiveBasketball, 10 * 1000);
// setInterval(checkMatchesToGoLiveKabaddi, 10 * 1000);
// setInterval(checkMatchesToGoLiveBadminton, 10 * 1000);
//setInterval(checkMatchesToGoLiveCarrom, 10 * 1000);