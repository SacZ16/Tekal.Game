const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const { getallUsers, getUser, newUser, putUserLogin,queryAllInfoUser} = require('../Controllers/dbFunctions.js')



router.get('/', async (req, res) => {
    res.json('estas en facebook')
})

router.post('/', async (req, res) => {
    async function run() {
        const user = await queryAllInfoUser(req.body.email)
        if (!user.Items.length) {
            putUserLogin({
                "PK": req.body.email,
                "SK": `INFO#${req.body.email}`,
                "email": req.body.email,
            })
        }
        else { 
            console.log(user)
            return user }
    }
    res.json(await run())
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder