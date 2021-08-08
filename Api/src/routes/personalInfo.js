const { Router, response } = require('express');
const router = Router();
const {putUserInfoRegisterItems} = require('../Controllers/dbFunctions.js')


router.post('/', async (req,res) => {
    console.log(req.body)
    putUserInfoRegisterItems(req.body)
    res.json('fijate la DB');
})


module.exports = router;