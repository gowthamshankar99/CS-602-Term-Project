const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
//https://fv7aoph7th.execute-api.us-east-1.amazonaws.com/Prod
exports.handler = (event, context, callback) => {
    console.log("Event gowtham monisha " + JSON.stringify(event));
    console.log(event['pathParameters']['ticker']);
        const params = {
             Item: {
             "ticker": {
               S: event['pathParameters']['ticker']
              },
              "shares":
              {
                 S: 'Y' 
              },
              "amount":
              {
                 S: 'Y' 
              }
             }, 
             ReturnConsumedCapacity: "TOTAL", 
            TableName: "portfolio"
            };
        dynamodb.putItem(params,function(err,data) {

            if(err) 
            {
                const response = {
                    statusCode: 400,
                    body: JSON.stringify({
                      message: JSON.stringify(err),
                      input: event,
                    }),
                  };
                console.log("Error while putting data into the dynamodb table " + err);
                callback(response,null);

            }
            else{
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({
                      message: JSON.stringify(data),
                      input: event,
                    }),
                  };
                console.log("data uploaded into the dynamo db " + data);
                callback(null,response);
            }
        });

};
