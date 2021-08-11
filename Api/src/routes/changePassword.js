const { Router, response } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const { updatePassword } = require('../Controllers/dbFunctions')
const  changePassword  = require('../services/changePassword.service')


router.post('/', async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let response = changePassword(email, password)
    res.send('Ok')
})
