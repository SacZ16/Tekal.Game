const { Router, response } = require('express');
const router = Router();
const { queryAllInfoUser, updateEmailVerification } = require('../Controllers/dbFunctions')
const {verificationEmail} = require('../services/register.service')


router.post('/', async (req,res) => {
    let email = req.body.email
    let response = await verificationEmail(email)
    console.log(response)
    if(response === 'Error' || response === undefined){
        res.send('This email is not registered')
    }
    if(response === 'Email already verified'){
        res.send('Email already verified')
    }
    res.send('Ok')
})



module.exports = router;