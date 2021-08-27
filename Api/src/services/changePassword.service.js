
const { updatePassword } = require('../Controllers/dbFunctions')

const changePassword = async (email, password) => {
        let response = await updatePassword(email, password)
        if(!response){return 'Email not found'}
        else {return response}
}

module.exports = changePassword;