const { Router, response } = require('express');
const router = Router();
const {verificationEmail} = require('../services/register.service')


router.post('/', async (req,res) => {
    let email = req.body.email
    let response = await verificationEmail(email)
    if(response === 'Error' || response === undefined){
        return res.json('This email is not registered')
    }
    if(response === 'Email already verified'){
        return res.json('Email already verified')
    }
    return res.json('Ok')
})



module.exports = router;