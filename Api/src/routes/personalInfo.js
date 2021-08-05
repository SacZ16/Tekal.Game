const { Router, response } = require('express');
const router = Router();
const {putUserInfoRegisterItems} = require('../Controllers/dbFunctions.js')


router.post('/', async (req,res) => {
    let response = req.body
    putUserInfoRegisterItems(respose)
    res.send(country);
})


module.exports = router;