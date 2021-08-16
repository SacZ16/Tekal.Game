const bcrypt = require('bcrypt');
const {putUserLogin}= require ('../Controllers/dbFunctions.js')

const registerUser = async (datos) =>{
    try{
        const infoUser = `INFO#${datos.email}`;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(datos.password, salt);

        const Item= {
            "PK": datos.email,
            "SK": infoUser,
            "email":  datos.email,
            "password": password,
        }
        const response = await putUserLogin(Item);
        return response;
    }catch(error){
        console.error(error);
        // manejenen el error como se les de la gana, pero manejenlo
    }
}

module.exports = {registerUser}