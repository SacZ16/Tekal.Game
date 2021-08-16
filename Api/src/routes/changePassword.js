const { Router, response } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const  changePassword  = require('../services/changePassword.service')


router.post('/', async (req,res) => {
    console.log(req.body)
    let email = req.body.email
    let password = req.body.password
    let response = changePassword(email, password)
    res.send('Ok')
})

module.exports = router;