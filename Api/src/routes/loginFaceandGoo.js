const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const { getallUsers, getUser, newUser } = require('../Controllers/dbFunctions.js')



router.get('/', async (req, res) => {
    res.json('estas en facebook')
})

router.post('/', async (req, res) => {
    async function run() {
        const user = await getUser(req.body)
        if (!user.Item) {
            newUser({ test: req.body.email, email: req.body.email })
            run()
        }
        else { 
            console.log(user)
            return user }
    }
    res.json(await (await run()).Item)
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder