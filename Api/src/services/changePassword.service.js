const axios = require('axios').default;
const { updatePassword, queryAllInfoUser } = require('../Controllers/dbFunctions')

const changePassword = async (email, password) => {
        await updatePassword(email, password)
        return 'passwordChanged'
}

module.exports = changePassword;