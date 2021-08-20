require('dotenv').config();
const axios = require('axios').default;
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const {
    REGION, ACCESS_KEY, SECRET_ACCESS_KEY,
} = process.env;



AWS.config.update({
    accessKeyId: 'AKIA27M5RUA5BXKOIIU4',
    secretAccessKey: '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'
})
const connectionDynamo = new AWS.DynamoDB.DocumentClient();
// const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

module.exports = { connectionDynamo, dynamodb };