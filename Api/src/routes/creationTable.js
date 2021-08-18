const { Router } = require('express');
const router = Router()
const {createAssetsTable}= require('../Controllers/dbFunctions')


router.get('/', async(req, res) => {
    await createAssetsTable()
    res.send('Table Created')
})



module.exports = router;