const axios = require('axios').default;
const AWS =require ('aws-sdk')

AWS.config.update({
    region:'sa-east-1',
    accessKeyId:'AKIAWCMCZRUF7D3V27PC',
    secretAccessKey:'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'
})
const connectionDynamo= new AWS.DynamoDB.DocumentClient();
// const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

module.exports = {connectionDynamo, dynamodb};