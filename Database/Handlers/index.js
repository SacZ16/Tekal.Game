const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB();
const  docClient = new AWS.DynamoDB.DocumentClient();

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

const putUserInfoItems = (userId, name, lastname, email, password, age) => {
    const table = "USER";
    const items = {
        userId,
        name,
        lastname,
        email,
        password,
        age
    }
    var infoUser = `INFO#${items.userId}`;

    let params = {
        TableName:table,
        Item:{
            "PK": {"S": items.userId},
            "SK": {"S": infoUser},
            "name": {"S": items.name},
            "lastName":{"S": items.lastname},
            "email": {"S": items.email},
            "password": {"S": items.password},
            "age": {"S": items.age}
        }
    };
    console.log("Adding a new user item...");
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else { 
            console.log("Added user item:", JSON.stringify(data, null, 2));
        }
    });
}

const putUserSessionItems = (userId, presentations, answers) => {
    const table = "USER";
    const sessionId = new Date().toString().replace(/ /g, "").slice(6,20);
    const items = {
        userId,
        presentations, 
        answers
    }
    const userSession = `SESSION#${items.userId}#${sessionId}`;

    let params = {
        TableName:table,
        Item:{
            "PK": items.userId, 
            "SK": userSession, 
            "presentations": presentations,
            "answers": answers
        }
    };

    console.log("Adding a new Session...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added Session:", JSON.stringify(data, null, 2));
        }
    });
}


const getTable = (tableName, keyValuePK, keyValueSK) => {
    let params = {
        TableName: tableName,
        Key:{
            "PK" : keyValuePK,
            "SK" : keyValueSK

        }
    };

    docClient.get(params, async function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}

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

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log("Query description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

const userTablesQuery = (keyName, keyValue) => {
    let params = {
        TableName : "USER",
        KeyConditionExpression: "#PK = :PK",
        ExpressionAttributeNames:{
            "#PK": keyName
        },
        ExpressionAttributeValues: {
            ":PK": keyValue
        }
    };
    
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded: " + JSON.stringify(data, null, 2));
        }
    });
    
}

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
    putUserInfoItems,
    putUserSessionItems,
    queryAllSessionsUser,
    userTablesQuery,
    getTable,
    deleteTable
}