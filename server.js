const express = require('express');
const expressHandlerBars = require('express-handlebars');
const underscore = require('underscore');
const bodyParser = require('body-parser');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const request = require('request-promise');
const unirest = require('unirest');
const cors = require('cors');

// comment


//app.engine('handlebars',expressHandlerBars({defaultLayout: 'main'}));
//app.set('view engine','handlebars');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/angular_scripts'));
app.use(express.static(__dirname + "/node_modules/socket.io-client/dist"));
app.use(bodyParser.urlencoded({ extended: true }));


// routing 
var routes = require('./routes/index');
app.use('/',routes);
app.use(cors());

const port = 8000;


server.listen(port,function() {
    console.log("Application listening on port " + port);
});


io.on('connection', function (socket) {
    
    
    
        console.log("Connection has been made");
    
    
        i = 1;
        j = 1;
    
        let myvar = setInterval(function () {
            i++;
            let tickerDetails = "";
            //console.log("*********************** " + location.href);
            request('https://iyz9xlw3ba.execute-api.us-east-1.amazonaws.com/Prod/getIndividualStockTickers')
                .then(function (res) {
                    var apikeyArray = ['CJqvD6sse8Gx9zxJBh4p','9cjx6en2H1_XFehNXrGx','3HVYUBy4scnsqVNyy7AH','8k_XdGhz3ZpQsrkmAQ7x','oxPe-NKycTsLufBSnHA1','Vw5hfcefYBXg5XAizZAz','bCh1bj_eBdxoAuPnBnc2','VL6p13eesf19Geg7Nt5C','DLUJj3K6wpyaRaY1NGwx','bKbzZJyh6KG6tCHRoirm','wumWvhTeZXoujr66ezmo','-ohyDNNXT4DA-b5bTw_H','sGYM8_o--Wn7s9bUhe9d','ATSizL4SqPs3wsDJ3PAu'];
    
                    console.log("unique messages .. please log these");
                    var TickerNames = [];
                    for (let item of JSON.parse(res).Items) {
                        var rand = apikeyArray[Math.floor(Math.random() * apikeyArray.length)];
                        
                        console.log("item "  + item.tickerName.S);
                        // the new api call should go here....
                        let tickerDetails = "";
                        unirest.get("https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/" + item.tickerName.S)
                        .header("X-Mashape-Key", "4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx")
                        .header("X-Mashape-Host", "adakadavra-smarket.p.mashape.com")
                        .end(function (result) {
                          //console.log(result.body.quote);
                          if(result.body != undefined)
                          {
                            if(result.body.quote != undefined)
                            {
                                tickerDetails = result.body.quote.financeData;
                                tickerDetails.ticker = item.tickerName.S;
                                console.log(tickerDetails);
                                TickerNames.push(tickerDetails);
                                socket.emit('message-from-server2', TickerNames);
                            }  

                          }
                          else
                          {
                              console.log("Issue with the call");
                          }

    
     
                        });
                    }
    
    
                })
                .catch(function (err) {
                    console.log(err)
                })
        

        // do a rest call to the portfolio table 

        request('https://fv7aoph7th.execute-api.us-east-1.amazonaws.com/Prod')

        {

        }
    
        }, 10000);
    
    
        socket.on('disconnect', function (reason) {
            clearInterval(myvar);
            console.log("connection disconnected " + reason);
            socket.disconnect();
        });
    
    });
