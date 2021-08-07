const AWS =require ('aws-sdk');
AWS.config.update({
    region:'sa-east-1',
    accessKeyId:'',
    secretAccessKey: ''
})


const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const createImagesTable = () => {
    let params = {
        TableName: "IMAGES",
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

const putImage = async (urlImageId) => {
    try{
        let params = {
            TableName: "IMAGES",
            Item:{
                "PK": urlImageId ,
                "views":  0,
                "wasTarget": 0,
                "targetHitted": 0,
                "watchedBy": [] 
            }
        };
        
        const image = await docClient.put(params).promise();
        console.log("Added image");
        return image;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

const putWasTargetImage = async (urlImageId) => {
    try {

        let params = {
            TableName: "IMAGES",
            Key:{
                "PK": {"S": urlImageId},
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
const putViewImage = async (urlImageId) => {
    try {

        let params = {
            TableName: "IMAGES",
            Key:{
                "PK": {"S": urlImageId},
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
const putWatcherImage = async (urlImageId, userId) => {
    try {
        let params = {
            TableName: "IMAGES",
            Key:{
                "PK": urlImageId
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
const putHittedImage = async (urlImageId) => {
    try {

        let params = {
            TableName: "IMAGES",
            Key:{
                "PK": {"S": urlImageId},
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
const getImageInfo = async (urlImageId) => {
    try {
        let params = {
            TableName: "IMAGES",
            Key:{
                "PK" :  urlImageId,
            }
        };

        const imageGot = await docClient.get(params).promise();
        console.log("GetImage succeeded:", JSON.stringify(imageGot, null, 2));
        return imageGot;
    }
    catch(error){
        console.error("Unable to read image. Error JSON:", JSON.stringify(error, null, 2));
    }

}

//ME TRAE TODA LA INFO DE TODOS LOS VIDEOS
const queryAllImages = async () => {
    try {
        let params = {
            TableName : "IMAGES",
        };
        
        const queryAllTheImages= await docClient.scan(params).promise();
        console.log("IMAGES:", JSON.stringify(queryAllTheImages, null, 2));
        return queryAllTheImages;
    }
    catch(error){
        console.log("Unable to SCAN. Error:", JSON.stringify(error, null, 2));
    }
}
// putImage("sopaDeVerdura")
// queryAllImages()
// putWasTargetImage("sopaDeVerdura")
// putWatcherImage("sopaDeVerdura")
// putHittedImage("sopaDeVerdura")
// putViewImage("sopaDeVerdura")
// putWatcherImage("sopaDeVerdura", "ddssds")

module.exports = {
    createImagesTable,
    putImage,
    putWasTargetImage,
    putWatcherImage,
    putHittedImage,
    putViewImage,
    getImageInfo,
    queryAllImages
}