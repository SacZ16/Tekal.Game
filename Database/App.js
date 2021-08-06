const { createUserTable, putUserInfoRegisterItems, putUserLogin,putUserSessionItems, 
    queryAllSessionsUser, queryAllInfoUser, userTablesQuery, getSubtable, 
    deleteTable} = require("./Handlers/index")



// //userId, name, lastname, email, password, age
// putUserInfoItems("ivangeronimo","ivan", "arevalo", null, null, null)

// putUserInfoItems("Sopa", "Sofia","Pellegrini", "amapetrice@gmail.com","contraseña","43")

// email contraseña
// ivan arevalo 98

//userid email apssword
// putUserLogin("sopaCarne", "funciona@gmail")

//userId name lastname age
// putUserInfoRegisterItems("sopaCarne", "ivan", "arevalo", "23");
    
//tableName, keyValuePK, keyValueSK
// getTable("USER", "sopaVerdura", "INFO#sopaVerdura") 
// userTablesQuery("PK", "Vacunar")

// console.log(new Date().toString().replace(/ /g, "").slice(6,20))

// //userId, presentations, answers
putUserSessionItems("sopaCarne", ["video1", "video2"], ["1","0"])
// queryAllSessionsUser("Vacunar")

// queryAllInfoUser("sopaVerdura")



// userTablesQuery("Funciona");
// deleteUser("Fabio")
// console.log(queryAllSessionsUser("Fabio"))
// const e = q && Object.values(q)
// console.log(e);
// logOutUserSession("Fabio")


// const logOutUserSession = async (userId) => {
//     try{
//         const rey = await queryAllSessionsUser(userId);
//     }
//     catch{

//     }
 

//     const table = "USER";
//     const sessionId = new Date().toString().replace(/ /g, "").slice(6,20);
//     const items = {
//         userId,
//         presentations, 
//         answers
//     }
//     const userSession = `SESSION#${items.userId}#${sessionId}`;

//     let params = {
//         TableName:table,
//         Item:{
//             "PK": {"S": items.userId}, 
//             "SK": {"S": userSession}, 
//             "loggedIn": {"S": new Date().toString()},
//             "presentations": {"SS": presentations},
//             "answers": {"NS": answers}
//         }
//     };

//     console.log("Adding a new Session...");
//     dynamodb.putItem(params, function(err, data) {
//         if (err) {
//             console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("Added Session:", JSON.stringify(data, null, 2));
//         }
//     });
// }

//createUserTable()
//deleteTable("USER")
// putUserLogin("Sopa","fsfs@fdsfs.com","contraseña")
//getSubtable("USER", "Sopa", "INFO#Sopa")
//putUserInfoRegisterItems("Sopa","Sofia","Pellegrini", "20")