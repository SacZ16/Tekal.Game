const axios = require('axios').default;
const AWS =require ('aws-sdk')
const {connectionDynamo, dynamodb} = require ('../db.js')

const TABLE_NAME="USER" 
const TABLE_ASSETS = "ASSETS"

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
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
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
const putUserLogin = async (user) => {
    try{
        
        let params = {
            TableName: TABLE_NAME,
            Item:user
        };
        const userLogin = await connectionDynamo.put(params).promise();
        // console.log("Added user item");
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

//trae toda la tabla info del usuario
const queryAllInfoUser = async (userId) => {
    try {
        let params = {
            TableName : TABLE_NAME,
            KeyConditionExpression: "#PK = :PK AND #info = :info",
            ExpressionAttributeNames:{
                "#PK": "PK",
                "#info": "SK"
            },
            ExpressionAttributeValues: {
                ":PK": userId,
                ":info": `INFO#${userId}`,
            }
        };

        const queryUserInfo = await connectionDynamo.query(params).promise()
        // console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));
        return queryUserInfo;
    }
    catch(error){
        console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createAssetsTable = () => {
    let params = {
        TableName : TABLE_ASSETS,
        KeySchema: [       
            { AttributeName: "PK", KeyType: "HASH"}, //Partition key
            { AttributeName: "SK", KeyType: "RANGE"} //Sort Key
        ],
        AttributeDefinitions: [       
            { AttributeName: "PK",  AttributeType: "S"},
            { AttributeName: "SK", AttributeType: "S"},
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
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

const putPKAssets = async (urlAsset, index) => {
    try{
        let params = {
            TableName: TABLE_ASSETS,
            Item:{
                "PK": urlAsset,
                "SK": index
            }
        };
        
        const video = await connectionDynamo.put(params).promise();
        console.log("Added video");
        return video;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

// const putAssets = async (info) => {
//     try{
//         let params = {
//             TableName: TABLE_ASSETS,
//             Item:{
//                 "PK": info.assetId,
//                 "SK": `SESSION#${info.assetId}#${info.sessionCharacteristics.role}#${date}`,
//                 "userId":  info.userId,
//                 "userMetadata": info.userMetadata,
//                 "date": info.date,
//                 "fileType": info.fileType,
//                 "sessionCharacteristics": info.sessionCharacteristics, 
//             }
//         };
        
//         const video = await connectionDynamo.put(params).promise();
//         console.log("Added video");
//         return video;
//     }
//     catch(error){
//         console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
//     }
// }

const putAssets = async (info) => {
    let string2 = info.url.slice(72);

    (function endpointFinder(){
        var asset = "";
        for(let i=0; i < string2.length; i++){
            if(string2[i] !== "?"){
                asset += string2[i];
            }
            else{
                return asset;
            }
        }
    })();

    try{
        let params = {
            TableName: TABLE_ASSETS,
            Item:{
                "PK": asset,
                "SK": `SESSION#${asset}#${info.category}#${info.date}`,
                "date": info.date,
                "fileType": info.type,
                "sessionCharacteristics": {
                    role: info.category,
                    reaction_time: info.seconds,
                    response: info.answer,
                }, 
            }
        };
        
        const video = await connectionDynamo.put(params).promise();
        console.log("Added video");
        return video;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

module.exports = {
    getallUsers, 
    getUser,
    newUser,
    putUserInfoRegisterItems,
    createUserTable,
    putUserLogin,
    queryAllInfoUser,
    createAssetsTable,
    putAssets,
    putPKAssets
}