const express = require('express');
const router = express.Router();

// other modules

const stockModule = require("./stockModule");

const portfolio = stockModule.getPortoflio;
const watchlist = stockModule.getWatchList;
const removeTicker = stockModule.removeTicker;
const addTicker = stockModule.addTicker;
const getPortfolioData = stockModule.calculateData;
const calculateTotalGain = stockModule.calculateTotalGain;
const createGraphs =   stockModule.createGraphs;
const contactMe = stockModule.contactMe;


router.get('/', (req, res, next) => {
  res.redirect('/portfolio');
});


router.get('/portfolio', portfolio);

router.get('/watchlist', watchlist);

router.get('/removeTicker', removeTicker);

router.get('/addTicker', addTicker);


router.get('/getPortfolioData',getPortfolioData);

router.get('/calculateTotalGain',calculateTotalGain);

router.get('/createGraphs',createGraphs);

router.get('/contactMe', contactMe);


module.exports = router;
