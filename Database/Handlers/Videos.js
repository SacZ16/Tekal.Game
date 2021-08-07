const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    accessKeyId:'',
    secretAccessKey: ''
})

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const createVideosTable = () => {
    let params = {
        TableName: "VIDEOS",
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
            TableName: "VIDEOS",
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

const putWasTargetVideo = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEOS",
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
const putViewVideo = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEOS",
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
const putWatcherVideo = async (urlVideoId, userId) => {
    try {
        let params = {
            TableName: "VIDEOS",
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
const putHittedVideo = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEOS",
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

//ME TRAE TODA LA INFO DE UN VIDEO
const getVideoInfo = async (videoId) => {
    try {
        let params = {
            TableName: "VIDEOS",
            Key:{
                "PK" :  videoId,
            }
        };

        const videoGot = await docClient.get(params).promise();
        console.log("GetItem succeeded:", JSON.stringify(videoGot, null, 2));
        return videoGot;
    }
    catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    }

}

//ME TRAE TODA LA INFO DE TODOS LOS VIDEOS
const queryAllVideos = async () => {
    try {
        let params = {
            TableName : "VIDEOS",
        };
        
        const queryAllTheVideos = await docClient.scan(params).promise();
        console.log("VIDEOS:", JSON.stringify(queryAllTheVideos, null, 2));
        return queryAllTheVideos;
    }
    catch(error){
        console.log("Unable to SCAN. Error:", JSON.stringify(error, null, 2));
    }
}

module.exports = {
    createVideosTable,
    putVideo,
    putWasTargetVideo,
    putWatcherVideo,
    putHittedVideo,
    putViewVideo,
    getVideoInfo,
    queryAllVideos
}