const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const { registerUser, sedEmail} = require('../services/register.service.js')
const { newUser, getallUsers, queryAllInfoUser, putUserInfoRegisterItems } = require('../Controllers/dbFunctions.js')

router.get('/', (req, res) => {
    getallUsers()
    // getUser()
    // newUser()
    res.json('Estas en Test User')
})

router.post('/', async (req, res) => {
    const user = await queryAllInfoUser(req.body.email)
    if (!user.Items.length) { 
        const datos = req.body
        if (!datos.email || !datos.password) throw new Error({ error: 'datos invalidos' })
        var response = await registerUser(datos)
        sedEmail(req.body.email)
        putUserInfoRegisterItems(datos)
        res.json({ status: true, data: response })
    }
    else{ res.json({ status: false})}
})

module.exports = router;