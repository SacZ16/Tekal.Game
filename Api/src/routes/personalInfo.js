const { Router, response } = require('express');
const router = Router();
const {putUserInfoRegisterItems, queryAllInfoUser} = require('../Controllers/dbFunctions.js')


router.post('/', async (req,res) => {
    if(req.body.age === '' || req.body.country === '' ||  req.body.city === '' || req.body.name === '' || req.body.lastname === ''){
        return res.send('campos incompletos')
    }
    let user = await queryAllInfoUser(req.body.email)
    if(user.hasOwnProperty('age') && user.hasOwnProperty('country')) {
        return res.send({status: true})
    }
    putUserInfoRegisterItems(req.body)
    res.status(200).json('fijate la DB');
})


module.exports = router;