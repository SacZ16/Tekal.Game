const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const { getallUsers, getUser, newUser, putUserLogin, queryAllInfoUser } = require('../Controllers/dbFunctions.js')



router.get('/', async (req, res) => {
    res.json('estas en facebook')
})
router.post('/', async (req, res) => {
    const { email, name } = req.body
    async function run() {
        const user = await queryAllInfoUser(email)
        console.log(user, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!user.Items.length) {
            await putUserLogin({
                "PK": email,
                "SK": `INFO#${email}`,
                "email": email,
                "name": name
            })
            return await queryAllInfoUser(email)
        }
        else {
            return user
        }
    }
    res.json(await run())
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder