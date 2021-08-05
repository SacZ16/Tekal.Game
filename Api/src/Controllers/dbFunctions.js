const { Router, response } = require('express');
const axios = require('axios').default;
const AWS =require ('aws-sdk')
const {connectionDynamo, dynamodb} = require ('../db.js')

const TABLE_NAME="test"

async function getallUsers(){
    const params = {
        TableName: TABLE_NAME
    };
    return await connectionDynamo.scan(params).promise();
}



async function getUser(user){
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
    return response.$response.requestId
}


//////////////////////////////////////////////////
const createUserTable = () => {
    let params = {
        TableName : TABLE_NAME,
        KeySchema: [       
            { AttributeName: "PK", KeyType: "HASH"}, //Partition key
            { AttributeName: "SK", KeyType: "RANGE"} //Sort Key
        ],
        AttributeDefinitions: [       
            { AttributeName: "PK",  AttributeType: "S"},
            { AttributeName: "SK", AttributeType: "S"},
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };
    
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

//Funcion que guarda los datos del primer loggin 
//(email y password o email) //LoginsG Y F 
const putUserLogin = async (userId, email, password) => {
    try{
        var infoUser = `INFO#${userId}`;

        let params = {
            TableName: TABLE_NAME,
            Item:{
                "PK": userId,
                "SK": infoUser,
                "email":  email,
                "password": password,
            }
        };
        
        const userLogin = await connectionDynamo.put(params).promise();
        console.log("Added user item");
        return userLogin;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}



//Funcion que guarda los datos del registro
//name lastname age //Formulario datos
const putUserInfoRegisterItems = async ({userId, name, lastname, age, country}) => {
    try {
        var infoUser = `INFO#${userId}`;

        let params = {
            TableName:TABLE_NAME,
            Key:{
                "PK": userId,
                "SK": infoUser,
            },
            UpdateExpression: "set #name = :name, lastname = :lastname, age = :age, country= :country",
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ExpressionAttributeValues: {
                ":name": name,
                ":lastname": lastname,
                ":age": age,
                ":country": country
            },
        
        };
    
        const registerInfo = connectionDynamo.update(params).promise();
        console.log("Added user item:", JSON.stringify(registerInfo, null, 2));
        return registerInfo;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}






module.exports = {getallUsers, getUser,newUser,putUserLogin, putUserInfoRegisterItems}