const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    KEY:'AKIAWCMCZRUF7D3V27PC',
    SECRETKEY: '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'
})

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

//const TABLE_USER = "USER";

//Crear videos 
//put video => crear el pk (la url) y el campo vistas en 0 target en 0 anotaciones en 0 y watched by []
//put target => agrega +1 al target
//put anotaciones => agrega +1 al anotaciones
//put watcher => agrega un elemento string al array



const createVideosTable = () => {
    let params = {
        TableName: "VIDEO",
        KeySchema: [
            { AttributeName: "PK", KeyType: "HASH"}
        ],
        AttributeDefinitions : [
            { AttributeName: "PK", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }


    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

const putVideo = async (urlVideoId) => {
    try{
        let params = {
            TableName: "VIDEO",
            Item:{
                "PK": urlVideoId ,
                "views":  0,
                "wasTarget": 0,
                "targetHitted": 0,
                "watchedBy": [] 
            }
        };
        
        const video = await docClient.put(params).promise();
        console.log("Added video");
        return video;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

const putWasTarget = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEO",
            Key:{
                "PK": {"S": urlVideoId},
            },
            UpdateExpression: "SET wasTarget = wasTarget + :inc",
            ExpressionAttributeValues: {
                ":inc": {"N": "1"}
            }
        };

        const target = await dynamodb.updateItem(params).promise();
        console.log("Added target:", JSON.stringify(target, null, 2));
        return target;
    }
    catch(error){
        console.error("Unable to target. Error JSON:", JSON.stringify(error, null, 2));
    }
}

//put views => agrega una view al video
const putView = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEO",
            Key:{
                "PK": {"S": urlVideoId},
            },
            UpdateExpression: "SET #views = #views + :inc",
            ExpressionAttributeNames: {
                "#views": "views"
            },   
            ExpressionAttributeValues: {
                ":inc": {"N": "1"}
            }
        };

        const viewAdded = await dynamodb.updateItem(params).promise();
        console.log("Added view:", JSON.stringify(viewAdded, null, 2));
        return viewAdded;
    }
    catch(error){
        console.error("Unable to view. Error JSON:", JSON.stringify(error, null, 2));
    }
}

//put watcher => agrega un elemento string al array
const putWatcher = async (urlVideoId, userId) => {
    try {
        let params = {
            TableName: "VIDEO",
            Key:{
                "PK": urlVideoId
            },
            UpdateExpression: "SET watchedBy = list_append(watchedBy, :value)",
            ExpressionAttributeValues: {
                ":value":  [userId]
            },
         
        };

        const watcher = await docClient.update(params).promise();
        console.log("Added watcher:", JSON.stringify(watcher, null, 2));
        return watcher;
    }
    catch(error){
        console.error("Unable to add watcher Error JSON:", JSON.stringify(error, null, 2));
    }
}

//put anotaciones => agrega +1 al anotaciones
const putHitted = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEO",
            Key:{
                "PK": {"S": urlVideoId},
            },
            UpdateExpression: "SET targetHitted = targetHitted + :inc",
            ExpressionAttributeValues: {
                ":inc": {"N": "1"}
            },
        };

        const hit = await dynamodb.updateItem(params).promise();
        console.log("Added hit:", JSON.stringify(hit, null, 2));
        return hit;
    }
    catch(error){
        console.error("Unable to hit. Error JSON:", JSON.stringify(error, null, 2));
    }
}

module.exports = {
    createVideosTable,
    putVideo,
    putWasTarget,
    putWatcher,
    putHitted,
    putView
}