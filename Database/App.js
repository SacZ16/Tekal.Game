const { createUserTable,putUserInfoItems,getTable, putUserSessionsItems,querySession } = require("./Handlers/index")

// createUserTable()
//userId, name, lastname, email, password, age
// putUserInfoItems("123", "Fabio","Pellegrini", "amapetrice@gmail.com","contraseña","43")
//
//putUserSessionsItems("124", ["fsdfs","dsfsdf"], ["1","0","0"])  
//tableName, keyValuePK, keyValueSK
querySession("123")

