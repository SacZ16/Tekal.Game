const axios = require('axios').default;
const { updatePassword, queryAllInfoUser } = require('../Controllers/dbFunctions')

const changePassword = async (email, password) => {
    let response = await queryAllInfoUser(email)
    if(response.Items){
        await updatePassword(email, password)
        return
    } else {
        return ('Email not registered')
    }
}

module.exports = changePassword;