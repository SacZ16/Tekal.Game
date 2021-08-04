const bcrypt = require('bcrypt');
const {newUser,getallUsers}= require ('../Controllers/dbFunctions.js')

const registerUser = async (datos) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(datos.password, salt);
        
        const user = {
            email: datos.email,
            password: password,
            test: datos.email
        };
        const response = await newUser(user)
        console.log(response)
        return response;
    }catch(error){
        console.error(error);
        // manejenen el error como se les de la gana, pero manejenlo
    }
}

module.exports = {registerUser}