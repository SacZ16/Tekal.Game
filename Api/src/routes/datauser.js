const { Router } = require('express');
const router = Router()
const { queryAllInfoUser } = require('../Controllers/dbFunctions')




router.post('/', async (req, res) => {
    let email = req.body.email; 
    let data = await queryAllInfoUser(email)
    res.send(data)
})


module.exports = router