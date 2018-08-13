const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
exports.handler = (event, context, callback) => {
// console.log("ticker name " + event['pathParameters']['ticker']);
// console.log("asasaas " + JSON.stringify(event));
 
 var params = {
  Key: {
   "tickerName": {
     S: event['pathParameters']['ticker']
    }
  }, 
  TableName: "stockTicker"
 };
 dynamodb.deleteItem(params, function(err, data) {
   if (err) { 
    console.log(err, err.stack); 
     const response = {
     statusCode:400,
     body:err
    }
    callback(response,null);
   }
   else     
   { 
    console.log(data); 
    data.end = "success";
    const response = {
     statusCode:200,
     body:JSON.stringify(data)
    }
    callback(null,response);
   }
 });
};