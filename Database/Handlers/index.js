const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_USER = "USER";

const createUserTable = () => {
    let params = {
        TableName : "USER",
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
//(email y password o email)
const putUserLogin = (userId, email, password) => {
    var infoUser = `INFO#${items.userId}`;

    let params = {
        TableName: TABLE_USER,
        Item:{
            "PK": userId,
            "SK": infoUser,
            "email":  email,
            "password": password,
        }
    };
    console.log("Adding a new user item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else { 
            console.log("Added user item:", JSON.stringify(data, null, 2));
        }
    });
}

//Funcion que guarda los datos del registro
//name lastname age
const putUserInfoRegisterItems = (userId, name, lastname, age) => {

    var infoUser = `INFO#${userId}`;

    let params = {
        TableName:TABLE_USER,
        Key:{
            "PK": userId,
            "SK": infoUser,
        },
        UpdateExpression: "set #name = :name, lastname = :lastname, age = :age",
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":lastname": lastname,
            ":age": age
        },
    
    };
    console.log("Adding a new user item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else { 
            console.log("Added user item:", JSON.stringify(data, null, 2));
        }
    });
}

//crea las sesiones del usuario
const putUserSessionItems = (userId, presentations, answers) => {
    const sessionId = new Date().toString().replace(/ /g, "").slice(6,20);

    const userSession = `SESSION#${userId}#${sessionId}`;

    let params = {
        TableName:TABLE_USER,
        Item:{
            "PK": {"S": userId}, 
            "SK": {"S": userSession}, 
            "loggedIn": {"S": new Date().toString()},
            "presentations": {"SS": presentations},
            "answers": {"NS": answers}
        }
    };

    console.log("Adding a new Session...");
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added Session:", JSON.stringify(data, null, 2));
        }
    });
}

//funcion que devuelve los datos de las subtablas
//de info#user o session#user
const getTable = (tableName, keyValuePK, keyValueSK) => {
    let params = {
        TableName: tableName,
        Key:{
            "PK" :  keyValuePK,
            "SK" :  keyValueSK
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

//funcion que trae todas las sesiones de un usuario determinado
const queryAllSessionsUser = (userId) => {
    let params = {
        TableName : "USER",
        KeyConditionExpression: "#PK = :PK AND #session > :session",
        ExpressionAttributeNames:{
            "#PK": "PK",
            "#session": "SK"
        },
        ExpressionAttributeValues: {
            ":PK": userId,
            ":session": `SESSION#${userId}`,
        }
    };

    docClient.query(params, async function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log("Query description JSON:", JSON.stringify(data, null, 2));
        }
    });
}
//trae toda la tabla info del usuario
const queryAllInfoUser = (userId) => {
    let params = {
        TableName : "USER",
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

    docClient.query(params, async function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log("Query description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

//no anda
const userTablesQuery = (keyValue) => {
    let params = {
        TableName : "USER",
        KeyConditionExpression: "PK = :PK",
        ExpressionAttributeValues: {
            ":PK": keyValue
        }
    };
    
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded: " + JSON.stringify(data, null, 2));
        }
    });
    
}
//elimina la tabla pasada por parametro 
const deleteTable = (tableName) => {
    let params = {
        TableName : tableName
    };
    
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
    
}

module.exports = {
    createUserTable,
    putUserInfoRegisterItems,
    putUserLogin,
    putUserSessionItems,
    queryAllSessionsUser,
    queryAllInfoUser,
    userTablesQuery,
    getTable,
    deleteTable
}