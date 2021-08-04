const axios = require('axios').default;
const AWS =require ('aws-sdk')

AWS.config.update({
    region:'sa-east-1',
    accessKeyId:'AKIA4RZFWMVZRUVHECTA',
    secretAccessKey:'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'
})
const connectionDynamo= new AWS.DynamoDB.DocumentClient();



module.exports = connectionDynamo;