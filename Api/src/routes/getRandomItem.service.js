function getRandomInt(min, max) {
    //Will return a number inside the given range, inclusive of both minimum and maximum
    //i.e. if min=0, max=20, returns a number from 0-20
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomItemNumber = getRandomInt(0, Items.length);


const queryPK = async (pk,randomItemNumber) => {
    try {
      let params = {
        TableName: TABLE_ASSETS,
        Key: {
            PK: Items[randomItemNumber].PK
          }
      };
  
      const queryUserInfo = await connectionDynamo.query(params).promise();
      //console.log("Query description JSON:", JSON.stringify(queryUserInfo, null, 2));
      return queryUserInfo;
    } catch (error) {
      console.log("Unable to query. Error:", JSON.stringify(error, null, 2));
    }
  };