const { Router } = require('express');
const router = Router();
const {getAssets} = require('../services/csv.service.js');
const {templateFiller} = require('../services/templates.service.js');
const {queryAllAssets} = require('../Controllers/dbFunctions');

router.get('/', async (_req,res) => {
    let assetsFromDb = await queryAllAssets();
    let info = assetsFromDb.Items;

    let array = [];
    info.forEach(f => {
        if(!array.includes(f.PK)){
            array.push(f.PK);
        }
    });
    
    let assets = await getAssets(array);
    let template = await templateFiller(assets);
    res.send(template);
})
module.exports = router;