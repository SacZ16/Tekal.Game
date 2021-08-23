const { Router } = require('express');
const router = Router()
const { queryAllInfoUser } = require('../Controllers/dbFunctions')




router.post('/', async (req, res) => {
    let email = req.body.email; 
    let data = await queryAllInfoUser(email)
    if(!data.Items.length){
        res.sendStatus(404)
    }
    res.status(200).send(data)
})


module.exports = router