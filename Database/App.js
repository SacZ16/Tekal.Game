const { createUserTable, putUserInfoItems, putUserSessionItems, queryAllSessionsUser, userTablesQuery, getTable, deleteTable, logOutUserSession} = require("./Handlers/index")

// createUserTable()

// //userId, name, lastname, email, password, age
// putUserInfoItems("Fabio", "Fabio","Pellegrini", "amapetrice@gmail.com","contraseña","43")

// putUserInfoItems("Sopa", "Sofia","Pellegrini", "amapetrice@gmail.com","contraseña","43")
    
//tableName, keyValuePK, keyValueSK
// getTable("USER", "Fabio", "INFO#Fabio"); 

// console.log(new Date().toString().replace(/ /g, "").slice(6,20))

// //userId, presentations, answers
// putUserSessionItems("Fabio", ["dfdfdfdf", "chau"], ["1","0"])
// queryAllSessionsUser("Fabio")

// deleteTable("USER")

// userTablesQuery("PK", "Angel367676fgdfgfgt5e4tretre79")

logOutUserSession("Fabio")