const { Router } = require('express');
const { putPKAssetsImages } = require('../Controllers/dbFunctions');
const { getListElements } = require('../services/csv.service');
const router = Router();


router.get('/', async (req, res) => {
    try{
        let array = await getListElements();
        let arrayData = array[1];
        arrayData.forEach(async (a) =>  await putPKAssetsImages(a));
        res.send('Assets Created');

    }catch(err){
        res.status(400).send("error")
        console.log(err)
    }


})
module.exports = router;