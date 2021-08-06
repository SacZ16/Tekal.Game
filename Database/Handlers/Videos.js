const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_USER = "USER";

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