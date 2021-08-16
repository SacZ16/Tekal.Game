
const { updatePassword } = require('../Controllers/dbFunctions')

const changePassword = async (email, password) => {
        await updatePassword(email, password)
        return 'passwordChanged'
}

module.exports = changePassword;