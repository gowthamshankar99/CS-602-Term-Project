
const _ = require('underscore');
const path = require('path');
const express = require('express');
const expressHandlerBars = require('express-handlebars');
const underscore = require('underscore');
const bodyParser = require('body-parser');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const request = require('request-promise');
const unirest = require('unirest');


module.exports.getPortoflio = (req, res, next) => {
		res.sendFile(path.join("/Users/Moni/Downloads/CS602_HW3_Gowrishankar_2/views/portfolio.html"));
	}

module.exports.getWatchList = (req,res,next) => {
	res.sendFile(path.join("/Users/Moni/Downloads/CS602_HW3_Gowrishankar_2/views/watchlist.html"));
}

module.exports.removeTicker = (req,res,next) => {
	res.sendFile(path.join("/Users/Moni/Downloads/CS602_HW3_Gowrishankar_2/views/removeTicker.html"));
}

module.exports.addTicker = (req,res,next) => {
	res.sendFile(path.join("/Users/Moni/Downloads/CS602_HW3_Gowrishankar_2/views/addTicker.html"));
}

module.exports.createGraphs = (req,res,next) => {
	res.sendFile(path.join("/Users/Moni/Downloads/CS602_HW3_Gowrishankar_2/views/createGraphs.html"));
}

module.exports.contactMe = (req,res,next) => {
	res.sendFile(path.join("/Users/Moni/Downloads/CS602_HW3_Gowrishankar_2/views/contact.html"));
}

module.exports.calculateData = (req,res,next) => {
	 let TickerNames = [];
		request('https://badnomyand.execute-api.us-east-1.amazonaws.com/Prod').then(function(done) {
					//	res.json(JSON.parse(done).message.Items);
					  let totalGain = 0;
						for(let i=0;i<JSON.parse(done).message.Items.length;i++)
						{
							unirest.get("https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/" + JSON.parse(done).message.Items[i].ticker.S)
							.header("X-Mashape-Key", "4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx")
							.header("X-Mashape-Host", "adakadavra-smarket.p.mashape.com")
							.end(function (result) {
								//console.log(result.body.quote);
								if(result.body != undefined)
								{	
									if(result.body.quote != undefined)
									{
									let parser = JSON.parse(done).message.Items[i];
									tickerDetails = result.body.quote.financeData;
									tickerDetails.ticker = parser.ticker.S;
									tickerDetails.Startgain = (parser.amount.S * parser.shares.S); 
									tickerDetails.endgain = Math.round(parser.shares.S * tickerDetails.ask);
									tickerDetails.gain =   Math.round((parser.shares.S * tickerDetails.ask) - (parser.amount.S * parser.shares.S));
									totalGain = totalGain  + tickerDetails.gain;
									tickerDetails.shares = JSON.parse(done).message.Items[i].shares.S;
									tickerDetails.amount = JSON.parse(done).message.Items[i].amount.S;
									tickerDetails.currentValue = Math.round(parser.shares.S * tickerDetails.ask);
									tickerDetails.Totalgain = totalGain;
									TickerNames.push(tickerDetails);
									//socket.emit('message-from-server2', TickerNames);
									console.log(JSON.parse(done).message.Items.length-1);
									if(i == JSON.parse(done).message.Items.length-1)
									{
										console.log("Is this getting resolved")
										setTimeout(function() {
											res.json(TickerNames);
										},1000);
										
									}
								}
								}
								else{
									console.log("Issue with the call");
								}

							});
						}

						


		})

	}



	module.exports.calculateTotalGain = (req,res,next) => {
		let TickerNames = [];
		 request('https://badnomyand.execute-api.us-east-1.amazonaws.com/Prod').then(function(done) {
					 //	res.json(JSON.parse(done).message.Items);
						 let totalGain = 0;
						 let totalValue = 0;
						 for(let i=0;i<JSON.parse(done).message.Items.length;i++)
						 {
							 unirest.get("https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/" + JSON.parse(done).message.Items[i].ticker.S)
							 .header("X-Mashape-Key", "4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx")
							 .header("X-Mashape-Host", "adakadavra-smarket.p.mashape.com")
							 .end(function (result) {
								 //console.log(result.body);
								 if(_.has(result.body, 'quote'))
								 {
								 let parser = JSON.parse(done).message.Items[i];
								 tickerDetails = result.body.quote.financeData;
								 tickerDetails.ticker = parser.ticker.S;
								 tickerDetails.Startgain = (parser.amount.S * parser.shares.S); 
								 tickerDetails.endgain = Math.round(parser.shares.S * tickerDetails.ask);
								 tickerDetails.gain =   Math.round((parser.shares.S * tickerDetails.ask) - (parser.amount.S * parser.shares.S));
								 totalGain = totalGain  + tickerDetails.gain;
								 totalValue = totalValue + Math.round(parser.shares.S * tickerDetails.ask);
								 tickerDetails.shares = JSON.parse(done).message.Items[i].shares.S;
								 tickerDetails.amount = JSON.parse(done).message.Items[i].amount.S;
								 tickerDetails.currentValue = Math.round(parser.shares.S * tickerDetails.ask);
								 tickerDetails.Totalgain = totalGain;
								 tickerDetails.TotalValue = totalValue;
								 //TickerNames.push(tickerDetails);
								 //socket.emit('message-from-server2', TickerNames);
								 console.log(JSON.parse(done).message.Items.length-1);
								 if(i == JSON.parse(done).message.Items.length-1)
								 {
									 console.log("Is this getting resolved")
									 setTimeout(function() {
										 res.json(tickerDetails);
									 },1000);
									 
								 }
								}
								else
								{
									console.log("***************************************************************");
									console.log(result.body);
									console.log("***************************************************************");
								}
							 });
						 }
 
						 
 
 
		 })
 
	 }

	