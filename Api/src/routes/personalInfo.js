const { Router, response } = require('express');
const router = Router();
const {putUserInfoRegisterItems, queryAllInfoUser} = require('../Controllers/dbFunctions.js')
const jwt = require ('jsonwebtoken')

router.post('/', async (req,res) => {
    if(req.body.age === '' || req.body.country === '' ||  req.body.city === '' || req.body.name === '' || req.body.lastname === ''){
        return res.send('campos incompletos')
    }
    var email=req.body.email
    let user = await queryAllInfoUser(email)
    if(user.hasOwnProperty('age') && user.hasOwnProperty('country')) {
        return res.send({status: true})
    }
    let obj = jwt.verify(email,'prueba');
    req.body.email=obj.email
    putUserInfoRegisterItems(req.body)
    res.status(200).json('fijate la DB');
})


module.exports = router;