const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const { registerUser } = require('../services/register.service')
const {newUser,getallUsers}= require ('../utils/dbFunctions')

router.get('/', (req, res) => {
    getallUsers()
    // getUser()
    // newUser()
res.json('Estas en Test User')
})

router.post('/', async (req, res) => {
    try {
        const datos = req.body
        if(!datos.email||!datos.password) throw new Error({error:'datos invalidos'})
        const response = await registerUser(datos)
        res.status(201).json({status:'OK',data:response})
    } catch (error) {
        return res.status(400).json({message:error})
    }    
})

module.exports = router;