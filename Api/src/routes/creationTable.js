const { Router } = require('express');
const router = Router()
const {createAssetsTable}= require('../Controllers/dbFunctions')


router.get('/', async(_req, res) => {
    try{
        await createAssetsTable();
        res.send('Table Created');
    }catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;