const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    accessKeyId:'',
    secretAccessKey:''
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
const putUserLogin = async (userId, email, password) => {
    try{
        var infoUser = `INFO#${userId}`;

        let params = {
            TableName: TABLE_USER,
            Item:{
                "PK": userId,
                "SK": infoUser,
                "email":  email,
                "password": password,
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

//Funcion que guarda los datos del registro
//name lastname age
const putUserInfoRegisterItems = async (userId, name, lastname, age) => {
    try {
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
    
        const registerInfo = docClient.update(params).promise();
        console.log("Added user item:", JSON.stringify(registerInfo, null, 2));
        return registerInfo;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

//crea las sesiones del usuario
const putUserSessionItems = async (userId, presentations, answers) => {
   try {
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
        const sessionAdded = await dynamodb.putItem(params).promise();
        console.log("Added Session:", JSON.stringify(sessionAdded, null, 2));
        return sessionAdded;
    } 
    catch (error) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
}

//funcion que devuelve los datos de las subtablas
//de info#user o session#user
const getSubtable = async (tableName, keyValuePK, keyValueSK) => {
    try {
        let params = {
            TableName: tableName,
            Key:{
                "PK" :  keyValuePK,
                "SK" :  keyValueSK
            }
        };

        const tableGot = await docClient.get(params).promise();
        console.log("GetItem succeeded:", JSON.stringify(tableGot, null, 2));
        return tableGot;
    }
    catch(error){
        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
    }

}

//funcion que trae todas las sesiones de un usuario determinado
const queryAllSessionsUser = async (userId) => {
    try {
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
        
        const queryAllSessions = await docClient.query(params).promise();
        console.log("Query description JSON:", JSON.stringify(queryAllSessions, null, 2));
        return queryAllSessions;
    }
    catch(error){
        console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
    }
}

//trae toda la tabla info del usuario
const queryAllInfoUser = async (userId) => {
    try {
        let params = {
            TableName : TABLE_USER,
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

        const queryUserInfo = await docClient.query(params).promise()
        console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));
        return queryUserInfo;
    }
    catch(error){
        console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
    }
}

//busca todas las subtablas de un usuario
const userTablesQuery = async (keyValue) => {
    try {
        let params = {
            TableName : TABLE_USER,
            KeyConditionExpression: "PK = :PK",
            ExpressionAttributeValues: {
                ":PK": keyValue
            }
        };
    
        const queryUser = await docClient.query(params).promise();
        console.log("Query succeeded: " + JSON.stringify(queryUser, null, 2));
        return queryUser;
    }
    catch(error){
        console.error("Unable to query. Error:", JSON.stringify(error, null, 2));
    }
    
}


//elimina la tabla pasada por parametro 
const deleteTable = async (tableName) => {
    try {
        let params = {
            TableName : tableName
        };
    
        const tableDeleted = await dynamodb.deleteTable(params).promise();
        console.log("Deleted table. Table description JSON:", JSON.stringify(tableDeleted, null, 2));
        return tableDeleted;
    }
    catch(error){
        console.error("Unable to delete table. Error JSON:", JSON.stringify(error, null, 2));
    }
    
}

module.exports = {
    createUserTable,
    putUserInfoRegisterItems,
    putUserLogin,
    putUserSessionItems,
    queryAllSessionsUser,
    queryAllInfoUser,
    userTablesQuery,
    getSubtable,
    deleteTable
}