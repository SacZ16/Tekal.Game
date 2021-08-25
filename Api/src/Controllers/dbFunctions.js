const { Router, response } = require("express");
const axios = require("axios").default;
const AWS = require("aws-sdk");
const { endpoint } = require("../services/endpoint.service");
const { connectionDynamo, dynamodb } = require("../db.js");
const bcrypt = require("bcrypt");
const ULID = require("ulid");

// const TABLE_USER = "HENRY-dev-USER";
const TABLE_USER = "USER";
const TABLE_ASSETS = "HENRY-dev-ASSET";

async function getallUsers() {
  const params = {
    TableName: TABLE_USER,
  };
  return await connectionDynamo.scan(params).promise();
}

async function getUser(user) {
  const params = {
    TableName: TABLE_USER,
    Key: {
      test: user.email,
    },
  };
  return await connectionDynamo.get(params).promise();
}

async function newUser(user) {
  const params = {
    TableName: TABLE_USER,
    Item: user,
  };
  const response = await connectionDynamo.put(params).promise();
  return response.$response.requestId;
}

//////////////////////////////////////////////////
const createUserTable = () => {
  let params = {
    TableName: TABLE_USER,
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" }, //Partition key
      { AttributeName: "SK", KeyType: "RANGE" }, //Sort Key
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
};

//Funcion que guarda los datos del primer loggin
//(email y password o email) //LoginsG Y F
const putUserLogin = async (user) => {
  // console.log(user)
  try {
    let params = {
      TableName: TABLE_USER,
      Item: user,
    };
    const userLogin = await connectionDynamo.put(params).promise();
    console.log(userLogin)
    // console.log("Added user item");
    return userLogin;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

//Funcion que guarda los datos del registro
//name lastname age //Formulario datos
const putUserInfoRegisterItems = async ({ email, name, lastname, age, country, gender, ethnicity, city }) => {
  console.log(email)
  console.log(country)
  try {
    var infoUser = `INFO#${email}`;

    let params = {
      TableName: TABLE_USER,
      Key: {
        "PK": email,
        "SK": infoUser,
      },
      UpdateExpression: "set #name = :name, lastname = :lastname, age = :age, country= :country, gender = :gender, ethnicity = :ethnicity, city = :city ",
      ExpressionAttributeNames: {
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":lastname": lastname,
        ":age": age,
        ":country": country,
        ":ethnicity": ethnicity,
        ":gender": gender,
        ":city": city,
      },
    };

    const registerInfo = connectionDynamo.update(params).promise();
    console.log("Added user item:", JSON.stringify(registerInfo, null, 2));
    return registerInfo;
  }
  catch (error) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
  }
}

//trae toda la tabla info del usuario
const queryAllInfoUser = async (userId) => {
  try {
    let params = {
      TableName: TABLE_USER,
      KeyConditionExpression: "#PK = :PK AND #info = :info",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#info": "SK",
      },
      ExpressionAttributeValues: {
        ":PK": userId,
        ":info": `INFO#${userId}`,
      },
    };

    let queryUserInfo = await connectionDynamo.query(params).promise();
    // console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));

    // queryUserInfo.Items[0].password = ''
    return queryUserInfo;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createAssetsTable = () => {
  let params = {
    TableName: TABLE_ASSETS,
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" }, //Partition key
      { AttributeName: "SK", KeyType: "RANGE" }, //Sort Key
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
};

/* const putAssets = async (info) => {
    try{
        let params = {
            TableName: TABLE_ASSETS,
            Item:{
                "PK": info.assetId,
                "SK": `SESSION#${info.assetId}#${info.sessionCharacteristics.role}#${date}`,
                "userId":  info.userId,
                "userMetadata": info.userMetadata,
                "date": info.date,
                "fileType": info.fileType,
                "sessionCharacteristics": info.sessionCharacteristics, 
            }
        };
        
        const video = await docClient.put(params).promise();
        console.log("Added video");
        return video;
    }
    catch(error){
        console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
    }
} */

const putAssets = async (email, info) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      Item: {
        PK: info.url,
        SK: `SESSION#${email}#${info.url}#${info.category}#${ULID.ulid()}`,
        date: info.date,
        fileType: info.type,
        pivot: "OK",
        userId: email,
        userMetadata: {
          age: info.age,
          country: info.country,
          emotion: info.mood,
        },
        sessionCharacteristics: {
          role: info.category,
          reaction_time: info.seconds,
          response: info.answer,
          pos: info.pos,
          lag: info.lag || null,
          pos_1st: info.pos_1st || null,
        },
      },
    };

    const video = await connectionDynamo.put(params).promise();
    console.log("Added video");
    return video;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const putUserGameItems = async (data) => {
  try {
    const userSession = `GAME#${data.email}#${ULID.ulid()}`

    let params = {
      TableName: TABLE_USER,
      Item: {
        PK: data.email,
        SK: userSession,
        playedAt: new Date().toString(),
        presentations: data.presentation,
        answers: data.answer,
        score: data.score.toString(),
        emotion: data.emotion,
        type: data.type
      },
    };
    console.log(params);
    const gameAdded = await connectionDynamo.put(params).promise();
    console.log("Added Session:", JSON.stringify(gameAdded, null, 2));
    return gameAdded;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};
/////////////////////////////////
const updateEmailVerification = async (userId) => {
  try {
    const infoUser = `INFO#${userId}`;

    let params = {
      TableName: "USER",
      Key: {
        PK: userId,
        SK: infoUser,
      },
      UpdateExpression: "set #verification = :value",
      ExpressionAttributeNames: {
        "#verification": "VerificationEmail",
      },
      ExpressionAttributeValues: {
        ":value": true,
      },
    };

    const registerInfo = connectionDynamo.update(params).promise();
    console.log("Added user item:", JSON.stringify(registerInfo, null, 2));
    return registerInfo;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const updatePassword = async (userId, pass) => {
  console.log(userId);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);

  try {
    const infoUser = `INFO#${userId}`;
    let params = {
      TableName: "USER",
      Key: {
        PK: userId,
        SK: infoUser,
      },
      UpdateExpression: "set #verification = :value",
      ExpressionAttributeNames: {
        "#verification": "password",
      },
      ExpressionAttributeValues: {
        ":value": password,
      },
    };
    const registerInfo = connectionDynamo.update(params).promise();
    console.log("Added user item:", JSON.stringify(registerInfo, null, 2));
    return registerInfo;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const viewedVideos = async (email) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      FilterExpression: "begins_with(#SK, :session1)",
      ExpressionAttributeNames: {
        "#SK": "SK",
      },
      ExpressionAttributeValues: {
        ":session1": `SESSION#${email}`,
      },
    };

    const scanName = await connectionDynamo.scan(params).promise();
    //console.log("Scan description JSON:", JSON.stringify(scanName, null, 2));
    return scanName;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const queryAllAssets = async (limite) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      ProjectionExpression: "#PK",
      ExpressionAttributeNames: {
        "#PK": "PK",
      },
      Limit: limite,
    };

    const queryAssetsInfo = await connectionDynamo.scan(params).promise();
    // console.log("Query description JSON:", JSON.stringify(queryAssetsInfo, null, 2));
    return queryAssetsInfo;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const updateView = async (url) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      Key: {
        PK: url,
        SK: url,
      },
      UpdateExpression: "SET #views = #views + :inc",
      ExpressionAttributeNames: {
        "#views": "views",
      },
      ExpressionAttributeValues: {
        ":inc": 1,
      },
    };
    const updateViews = connectionDynamo.update(params).promise();
    console.log("Added user item:", JSON.stringify(updateViews, null, 2));
    return updateViews;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const queryPK = async (pk) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      KeyConditionExpression: "#PK = :PK AND #SK = :PK",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#SK": "SK",
      },
      ExpressionAttributeValues: {
        ":PK": pk,
      },
    };

    const queryUserInfo = await connectionDynamo.query(params).promise();
    //console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));
    return queryUserInfo;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const putPKAssetsVideos = async (urlAsset /*,index*/) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      Item: {
        PK: urlAsset,
        SK: urlAsset /*index*/,
        views: 0,
        status: "video",
      },
    };

    const video = await connectionDynamo.put(params).promise();
    console.log("Added video");
    return video;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const putPKAssetsImages = async (urlAsset) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      Item: {
        PK: urlAsset,
        SK: urlAsset,
        views: 0,
        status: "image",
      },
    };

    const video = await connectionDynamo.put(params).promise();
    console.log("Added video");
    return video;
  } catch (error) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const orderAsset = async (limite, asset) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      IndexName: "filter-by-views",
      KeyConditions: {
        status: {
          ComparisonOperator: "EQ",
          AttributeValueList: [asset],
        },
      },
      ScanIndexForward: true,
      Limit: limite,
    };

    const orderByViews = await connectionDynamo.query(params).promise();
    //console.log("Scan description JSON:", JSON.stringify(orderByViews, null, 2));
    return orderByViews;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const orderNextAsset = async (limite, last, views, asset) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      IndexName: "filter-by-views",

      KeyConditions: {
        status: {
          ComparisonOperator: "EQ",
          AttributeValueList: [asset],
        },
      },
      ScanIndexForward: true,
      Limit: limite,
      ExclusiveStartKey: {
        views: views,
        SK: last,
        PK: last,
        status: asset /*'OK'*/,
      },
    };

    const orderByViews = await connectionDynamo.query(params).promise();
    //console.log("Scan description JSON:", JSON.stringify(orderByViews, null, 2));
    return orderByViews;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const getSessions = async (email) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      IndexName: "filter-by-session",
      KeyConditions: {
        pivot: {
          ComparisonOperator: "EQ",
          AttributeValueList: ["OK"],
        },
        SK: {
          ComparisonOperator: "BEGINS_WITH",
          AttributeValueList: [`SESSION#${email}`],
        },
      },
    };

    const sessions = await connectionDynamo.query(params).promise();
    //console.log("Query description JSON:", JSON.stringify(sessions, null, 2));
    return sessions;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//no chekeado por la produccion
const updateAnnotationsCorrect = async (url) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      Key: {
        PK: url,
        SK: url
      },
      UpdateExpression: "SET correctAnnotations = if_not_exists(correctAnnotations, :value) + :inc",
      ExpressionAttributeValues: {
        ":value": 0,
        ":inc": 1
      }
    };
    const updateViews = connectionDynamo.update(params).promise();
    console.log("Added user item:", JSON.stringify(updateViews, null, 2));
    return updateViews;
  } catch (error) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
  }
};

const getGameUser = async (email) => {
  try {
    let params = {
      TableName: TABLE_USER,
      KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#SK": "SK",
      },
      ExpressionAttributeValues: {
        ":PK": email,
        ":SK": `GAME#${email}`
      },
    };

    const queryUserInfo = await connectionDynamo.query(params).promise();
    console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));
    return queryUserInfo;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//getGameUser("sofia@gmail.com")
module.exports = {
  getallUsers,
  getUser,
  newUser,
  putUserInfoRegisterItems,
  createUserTable,
  putUserLogin,
  queryAllInfoUser,
  createAssetsTable,
  putAssets,
  putUserGameItems,
  updateEmailVerification,
  updatePassword,
  viewedVideos,
  queryAllAssets,
  updateView,
  queryPK,
  putPKAssetsVideos,
  orderAsset,
  orderNextAsset,
  getSessions,
  putPKAssetsImages,
  updateAnnotationsCorrect,
  getGameUser
};
