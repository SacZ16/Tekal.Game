const { createUserTable, putUserInfoItems, putUserSessionItems, queryAllSessionsUser, userTablesQuery, getTable, deleteTable } = require("./Handlers/index")

// createUserTable()

//userId, name, lastname, email, password, age
// putUserInfoItems("Fabio", "Fabio","Pellegrini", "amapetrice@gmail.com","contraseña","43")

// putUserInfoItems("Angel367676fgdfgfgt5e4tretre79", "Angel","Pellegrini", "amapetrice@gmail.com","contraseña","43")
    
//tableName, keyValuePK, keyValueSK
// getTable("USER", "Ivanox", "INFO#Ivanox"); 

// console.log(new Date().toString().replace(/ /g, "").slice(6,20))

// //userId, presentations, answers
putUserSessionItems("Fabio", ["dfdfdfdf", "chau"], [1,0])
// queryAllSessionsUser("Fabio")

// deleteTable("User1")

// userTablesQuery("PK", "Angel367676fgdfgfgt5e4tretre79")