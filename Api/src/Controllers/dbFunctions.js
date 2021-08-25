const { connectionDynamo, dynamodb } = require("../db.js");
const bcrypt = require("bcrypt");
const ULID = require("ulid");
const { getAge } = require("../services/dateToAge.service.js");

const TABLE_USER = "HENRY-dev-USER";
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
  try {
    let params = {
      TableName: TABLE_USER,
      Item: user,
    };
    const userLogin = await connectionDynamo.put(params).promise();
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
const putUserInfoRegisterItems = async ({
  userId,
  name,
  lastname,
  age,
  country,
}) => {
  const finalAge = getAge(age);
  try {
    var infoUser = `INFO#${userId}`;

    let params = {
      TableName: TABLE_USER,
      Key: {
        PK: userId,
        SK: infoUser,
      },
      UpdateExpression:
        "set #name = :name, lastname = :lastname, age = :age, country= :country",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":lastname": lastname,
        ":age": finalAge,
        ":country": country,
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

    const queryUserInfo = await connectionDynamo.query(params).promise();
    //console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));
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
    const userSession = `GAME#${data.email}#${ULID.ulid()}`;
    let params = {
      TableName: TABLE_USER,
      Item: {
        PK: data.email,
        SK: userSession,
        playedAt: data.date,
        presentations: data.presentation,
        answers: data.answer,
        score: data.score,
        emotion: data.emotion,
        type: data.type,
        longTerm: data.longTerm,
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
      TableName: TABLE_USER,
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
      TableName: TABLE_USER,
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
        PK:  url ,
        SK:  url
      },
      UpdateExpression: "SET correctAnnotations = if_not_exists(correctAnnotations, :value) + :inc",
      ExpressionAttributeValues: {
        ":value": 0,
        ":inc":1
      }
    };
    const updateViews = connectionDynamo.update(params).promise();
    console.log("Added user item:", JSON.stringify(updateViews, null, 2));
    return updateViews;
  } catch (error) {
    console.error("Unable to add item. Error JSON:",JSON.stringify(error, null, 2));
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


//I want to know the total set of sessions played
const totalSessions = async () => {
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
          AttributeValueList: [`SESSION#`],
        },
      },
    };

    const sessions = await connectionDynamo.query(params).promise();
    console.log("Query description JSON:", JSON.stringify(sessions, null, 2));
    return sessions;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//I want to be able to fetch all users in a certain age group
const userCertainAge = async (age1, age2) => {
  try {
    let params = {
      TableName: TABLE_USER,
      FilterExpression: "begins_with(#info, :info)",
      ExpressionAttributeNames: {
        "#info": "SK"
      },
      ExpressionAttributeValues: {
        ":info": "INFO#"
      },
    };
    const queryUserInfo = await connectionDynamo.scan(params).promise();
    const items = queryUserInfo.Items;
    const usersAge = []; 
    items.forEach(u => {if(u.age){ 
      let ageS = u.age.toString();
      let ageT = getAge(ageS);
      if(ageT >= age1 && ageT <= age2){
        usersAge.push({
          id: u.PK, 
          age: ageT
        })}
    }})
    return usersAge;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//I want to be able to fetch all users in a certain location
const userCertainLocation = async (location) => {
  try {
    let params = {
      TableName: TABLE_USER,
      FilterExpression: "begins_with(#info, :info)",
      ExpressionAttributeNames: {
        "#info": "SK"
      },
      ExpressionAttributeValues: {
        ":info": "INFO#"
      },
    };
    const queryUserInfo = await connectionDynamo.scan(params).promise();
    const items = queryUserInfo.Items;
    const usersInLocation = []; 
    items.forEach(u => {if(u.city){ 
      if(u.city === location){
        usersInLocation.push({
          id: u.PK, 
          city: u.city
        })}
    }})
    console.log(usersInLocation);
    return usersInLocation;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//I want to know how many sessions(games) a user has played 
const gamesPlayed = async (email) => {
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
        ":SK": "GAME#"
      },
    };

    const gamesPlayed = await connectionDynamo.query(params).promise();
    //console.log("Query description JSON:", JSON.stringify(gamesPlayed, null, 2));
    return gamesPlayed;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//I want to get number of sessions played by a user
const numberOfSessionPlayed = async (id) =>{
  let games = await gamesPlayed(id);
  let count = games.Count;
  return count;
}

//I want to know how many users saw a given asset
const viewedBy = async (asset) => {
  try {
    let params = {
      TableName: TABLE_ASSETS,
      KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#SK": "SK",
      },
      ExpressionAttributeValues: {
        ":PK": asset,
        ":SK": "SESSION#"
      },
    };

    const viewedBy = await connectionDynamo.query(params).promise();
    //console.log("Query description JSON:", JSON.stringify(viewedBy, null, 2));
    return viewedBy;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

//I want to know the details of the full session where an asset was shown
const detailsOfAsset = async (asset) => {
  try {
    let params = {
      TableName: TABLE_USER,
      FilterExpression: "begins_with(#info, :info)",
      ExpressionAttributeNames: {
        "#info": "SK"
      },
      ExpressionAttributeValues: {
        ":info": "GAME#"
      },
    };
    const queryUserInfo = await connectionDynamo.scan(params).promise();
    const items = queryUserInfo.Items;
    const usersInLocation = []; 
    items.forEach(u => {if(u.presentations.includes(asset)){ 
      usersInLocation.push(u);
    }})
    console.log(usersInLocation);
    return usersInLocation;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
}

//I want to get the number of false positives of a user in a session 
//(how many times the user pressed spacebar on a video that wasnt a target_repeat)



//I want to get the average false positive rate of a user in a session 
//(false positives divided by number of videos shown)

//I want to get the average vigilance score of a user 
//(how many vigilances were recognized divided by the number of vigilance repeats shown)


const lowerScore = async (type,score) => {
  try {
    let params = {
      TableName: TABLE_USER,
      IndexName: "type-score-index",
      KeyConditions: {
        type: {
          ComparisonOperator: "EQ",
          AttributeValueList: [type],
        },
        score: {
          ComparisonOperator: "LT",
          AttributeValueList: [score]
        }
      },
      ScanIndexForward: false,
    };

    const orderByViews = await connectionDynamo.query(params).promise();
    console.log("Scan description JSON:", JSON.stringify(orderByViews, null, 2));
    return orderByViews;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const lowerScoreNext = async (score,scoreLEK,sk,pk,type) => {
  try {
    let params = {
      TableName: TABLE_USER,
      IndexName: "type-score-index",
      KeyConditions: {
        type: {
          ComparisonOperator: "EQ",
          AttributeValueList: [type],
        },
        score: {
          ComparisonOperator: "LT",
          AttributeValueList: [score]
        }
      },
      ExclusiveStartKey: {
        score: scoreLEK,
        SK: sk,
        PK: pk,
        type

      },
      ScanIndexForward: false,
    };

    const orderByViews = await connectionDynamo.query(params).promise();
    console.log("Scan description JSON:", JSON.stringify(orderByViews, null, 2));
    return orderByViews;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const scores = async (type) => {
  try {
    let params = {
      TableName: TABLE_USER,
      IndexName: "type-score-index",
      KeyConditions: {
        type: {
          ComparisonOperator: "EQ",
          AttributeValueList: [type],
        }
      },
      Limit: 2,
      ScanIndexForward: false,
    };

    const orderByViews = await connectionDynamo.query(params).promise();
    //console.log("Scan description JSON:", JSON.stringify(orderByViews, null, 2));
    return orderByViews;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};

const scoresNext = async (score,sk,pk,type) => {
  try {
    let params = {
      TableName: TABLE_USER,
      IndexName: "type-score-index",
      KeyConditions: {
        type: {
          ComparisonOperator: "EQ",
          AttributeValueList: [type],
        }
      },
      Limit: 2,
      ScanIndexForward: false,
      ExclusiveStartKey: {
        score: score,
        SK: sk,
        PK: pk,
        type

      },
    };

    const orderByViews = await connectionDynamo.query(params).promise();
    //console.log("Scan description JSON:", JSON.stringify(orderByViews, null, 2));
    return orderByViews;
  } catch (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
};
// Scores("video")
//devuelve todos los games
const scanAllGamesType = async (type) => {
  try {
    let params = {
      TableName: TABLE_USER,
      FilterExpression: "begins_with(#info, :info)",
      ExpressionAttributeNames: {
        "#info": "SK"
      },
      ExpressionAttributeValues: {
        ":info": "GAME#"
      },
    };
    const queryUserInfo = await connectionDynamo.scan(params).promise();
    const items = queryUserInfo.Items;
    const gamesType = []; 
    items.forEach(u => {if(u.type === type){ 
      gamesType.push(u);
    }})
    const cantGamesType = gamesType.length;
    console.log(cantGamesType);
    return gamesType;
  } catch  (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
}

//devuelve la cantidad de games menores a tal valor
const scanAllGamesLowerThan = async (value, type) => {
  try {
    const games = await scanAllGamesType(type);
    const gamesLower = []; 
    games.forEach(u => {if(u.score < value){ 
      gamesLower.push(u);
    }})
    const cantGamesLower = gamesLower.length;
    console.log(cantGamesLower);
    return cantGamesLower;
  } catch  (error) {
    console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
  }
}

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
  getGameUser,
  gamesPlayed,
  scanAllGamesType,
  scanAllGamesLowerThan,
  lowerScore,
  scores,
  lowerScoreNext,
  scoresNext
};
