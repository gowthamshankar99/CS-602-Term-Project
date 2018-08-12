const express = require('express');
const router = express.Router();

// other modules

const employeeModule = require("./employeeModule");

const portfolio = employeeModule.getPortoflio;
const watchlist = employeeModule.getWatchList;
const removeTicker = employeeModule.removeTicker;
const addTicker = employeeModule.addTicker;
const getPortfolioData = employeeModule.calculateData;
const calculateTotalGain = employeeModule.calculateTotalGain;
const createGraphs =   employeeModule.createGraphs;


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


module.exports = router;
