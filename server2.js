const unirest = require('unirest');
const request = require('request');

// added comment

//unirest.get("https://adakadavra-smarket.p.mashape.com/api/v1/public/quote/PFE")
//.header("X-Mashape-Key", "4B5APBMEQVmshPhOG6gHcc4bELr6p1z8wQgjsnczgNTYuQPwpx")
//.header("X-Mashape-Host", "adakadavra-smarket.p.mashape.com")
//.end(function (result) {
//    console.log(result.raw_body);

//});
const a = 'Time Series (Daily)'
const date = '2018-03-22';
//console.log(`${a}`);
request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=9cjx6en2H1_XFehNXrGx',(err,data,response) => {
    if(err)
    {
        console.log('error');
    }
    else{
        console.log(JSON.parse(response)[`${a}`][`${date}`]);
        for(let i=0;i<11;i++)
        {
            // new date
            let date2 = new Date();

            let getDateOnly = "";
            if((date2.getDate()-i) < 10)
            {
                 getDateOnly = date2.getFullYear() + "-0"  + (date2.getMonth() + 1) + "-0" + (date2.getDate()-i);
            }
            else
            {
                getDateOnly = date2.getFullYear() + "-0"  + (date2.getMonth() + 1) + "-" + (date2.getDate()-i);
            }
            
            console.log(getDateOnly);
            if(JSON.parse(response)[`${a}`][`${getDateOnly}`] != undefined)
            {
                console.log(JSON.parse(response)[`${a}`][`${getDateOnly}`]['5. volume']);
            }
            
        }
    }
})
