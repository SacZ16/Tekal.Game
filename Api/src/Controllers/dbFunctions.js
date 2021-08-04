const { Router, response } = require('express');
const axios = require('axios').default;
const AWS =require ('aws-sdk')
const connectionDynamo = require ('../db.js')

const TABLE_NAME="test"

async function getallUsers(){
    const params = {
        TableName: TABLE_NAME
    };
    return await connectionDynamo.scan(params).promise();
}



async function getUser(user){
    console.log(user)
    const params = {
        TableName: TABLE_NAME,
        Key:{'test':user.email,
        }
    }
    return await connectionDynamo.get(params).promise() ;
}



async function newUser(user){
    const params = {
        TableName: TABLE_NAME,
        Item: user
    };
    const response = await connectionDynamo.put(params).promise();
    console.log(response.$response.requestId)
    return response.$response.requestId
}

module.exports = {getallUsers, getUser,newUser}