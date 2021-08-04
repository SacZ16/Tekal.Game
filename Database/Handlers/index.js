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
    const params = {
        userId: userId,
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        age:age
    }
    var qsy = `Info#${items.userId}`
    var params = {
        TableName:table,
        Key:{
            "PK": items.userId,
            "SK": "qsy"
        },
        // KeyConditionExpression: "#bbb=Info#:aaa",
        // ExpressionAttributeNames: {
        //     "#bbb":"SK"
        // },
        // ExpressionAttributeValues:{
        //     ":aaa": items.UserId
        // },
        Item:{
            "name": items.name,
            "lastName": items.lastname,
            "email": items.email,
            "password": items.password,
            "age": items.age
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

const getTable = (tableName, keyName, keyValue) => {

    var params = {
        TableName: tableName,
        Key:{
            keyName : keyValue,
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

module.exports = {
    createUserTable,
    putUserInfoItems,
    getTable,
}