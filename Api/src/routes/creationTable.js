const { Router } = require('express');
const router = Router()
const {createUserTable}= require('../Controllers/dbFunctions')


router.get('/', async(req, res) => {
    await createUserTable();
    res.send('Table Created');
})



module.exports = router;