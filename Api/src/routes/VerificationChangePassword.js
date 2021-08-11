const { Router, response } = require('express');
const router = Router();
const { queryAllInfoUser, updateEmailVerification } = require('../Controllers/dbFunctions')
const {sendEmailForPassword} = require('../services/register.service')


router.post('/', async (req,res) => {
    let email = req.body.email
    let response = await queryAllInfoUser(email)
    if(response.Items.length){
        await sendEmailForPassword(email);
        res.send('Ok')
    } else {
        res.send('Email not registered')
    }
})



module.exports = router;