const { Router, response } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const  changePassword  = require('../services/changePassword.service')


router.post('/', async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let response = await changePassword(email, password)
    if(response === 'Email not found'){
        res.sendStatus(404)
    } else {
        res.status(200).send('Ok')
    }
})

module.exports = router;