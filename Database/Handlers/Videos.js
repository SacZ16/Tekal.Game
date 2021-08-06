const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    endpoint: "http://localhost:8000"
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
            { AttributeName: "PK", Keytype: "HASH"}
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
                "PK": { "S" :urlVideoId },
                "views":  { "N" : "0"},
                "wasTarget": { "N":"0" },
                "targetHitted": { "N":"0" },
                "watchedBy": {"SS" : [] }

            }
        };
        
        const userLogin = await docClient.put(params).promise();
        console.log("Added user item");
        return userLogin;
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
                "PK": urlVideoId,
            },
            UpdateExpression: "set wasTarget = :target",
            ExpressionAttributeValues: {
                ":target": wasTarget++
            },
        };

        const hit = docClient.update(params).promise();
        console.log("Added target:", JSON.stringify(hit, null, 2));
        return hit;
    }
    catch(error){
        console.error("Unable to hit. Error JSON:", JSON.stringify(error, null, 2));
    }
}

//put watcher => agrega un elemento string al array
const putWatcher = async (urlVideoId, userId) => {
    try {

        let params = {
            TableName: "VIDEO",
            Key:{
                "PK": urlVideoId,
            },
            UpdateExpression: "SET #watchedBy = list_append(#watchedBy, :watcher)",
            ExpressionAttributeNames : {
                "#watchedBy" : "watchedBy"
              },
            ExpressionAttributeValues: {
                ":watcher": [userId]
            },
        };

        const watcher = docClient.update(params).promise();
        console.log("Added user item:", JSON.stringify(watcher, null, 2));
        return watcher;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

//put anotaciones => agrega +1 al anotaciones
const putHitted = async (urlVideoId) => {
    try {

        let params = {
            TableName: "VIDEO",
            Key:{
                "PK": urlVideoId,
            },
            UpdateExpression: "set targetHitted = :hit",
            ExpressionAttributeValues: {
                ":hit": targetHitted++
            },
        };

        const hit = docClient.update(params).promise();
        console.log("Added hit:", JSON.stringify(hit, null, 2));
        return hit;
    }
    catch(error){
        console.error("Unable to hit. Error JSON:", JSON.stringify(error, null, 2));
    }
}