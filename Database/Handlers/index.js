const AWS =require ('aws-sdk');

AWS.config.update({
    region:'sa-east-1',
    endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB();
const  docClient = new AWS.DynamoDB.DocumentClient();

const createUserTable = () => {
    var params = {
        TableName : "User1",
        KeySchema: [       
            { AttributeName: "PK", KeyType: "HASH"},  //Partition key
            {
                AttributeName: "SK", 
                KeyType: "RANGE"
            }
            // {
            //     AttributeName: "UserSession", 
            //     KeyType: "RANGE"
            // }
        ],
        AttributeDefinitions: [       
            { 
                AttributeName: "PK", 
                AttributeType: "S" 
            },
            { 
                AttributeName: "SK", 
                AttributeType: "S" 
            },
            // { 
            //     AttributeName: "UserSession", 
            //     AttributeType: "S" 
            // },



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
    const table = "User1";
    const items = {
        userId,
        name,
        lastname,
        email,
        password,
        age
    }
    var infoUser = `Info#${items.userId}`;

    var params = {
        TableName:table,
        // Key:{
        //     "PK": items.userId,
        //     "SK": "qsy"
        // },
        // KeyConditionExpression: "#bbb=Info#:aaa",
        // ExpressionAttributeNames: {
        //     "#bbb":"SK"
        // },
        // ExpressionAttributeValues:{
        //     ":aaa": items.UserId
        // },
        Item:{
            "PK": items.userId,
            "SK": infoUser,
            "name": items.name,
            "lastName": items.lastname,
            "email": items.email,
            "password": items.password,
            "age": items.age
        }
    };

    console.log("Adding a new info...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

const putUserSessionsItems = (userId,presentations,answers) => {
    var sessionId= new Date().toString().replace(/ /g, "").slice(6)
    const table = "User1";
    const items = {
        userId,
    //por ahora
        presentations,
        answers

    }
    var sessionUser = `Session#${items.userId}#${sessionId}`;

    var params = {
        TableName:table,
        Item:{
            "PK": items.userId,
            "SK": sessionUser,
            "createdAt": new Date().toString,
            "presentations": presentations,
            "answers": answers
        }
    };

    console.log("Adding a new session...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

const getTable = (tableName, keyValuePK, keyValueSK) => {

    var params = {
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
            try{
                const dataTable = await data;
                console.log("GetItem succeeded:", dataTable);
            }
            catch{
                console.log("caca");
            }
            
        }
    });
}

const tableQuery = (table, keyName, keyValue) => {
    var params = {
        TableName : table,
        KeyConditionExpression: "#key = :keyValue",
        ExpressionAttributeNames:{
            "#key": keyName
        },
        ExpressionAttributeValues: {
            ":keyValue": keyValue
        }
    };
    
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded: " + JSON.stringify(data));
        }
    });
    
}

const deleteTable = (tableName) => {
    var params = {
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

const querySession = (userId) => {
    // const items = {
    //     userId
    // }
    var params = {
        TableName : "User1",
        // ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
        KeyConditionExpression: "#PK = :pk AND SK BETWEEN :session AND :userId",
        ExpressionAttributeNames:{
            "#PK": "PK"
        },
        ExpressionAttributeValues: {
            ":pk": userId,
            ":session": `Session#${userId}`,
            ":userId": "Z"
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


module.exports = {
    createUserTable,
    putUserInfoItems,
    getTable,
    putUserSessionsItems,
    querySession
}