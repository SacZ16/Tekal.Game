const { Router } = require('express');
const router = Router();
const { getAssets, getAssetsImages} = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { assetNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');

router.post('/', async (req, res) => {
    let { email } = req.body;
    let { mode } =req.body;
    let templateChoosen = picker();
    let assetsFromDb = await assetNotSeen(email,mode);
    const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)
    if(mode === 'image'){
        const assets = await getAssetsImages(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        console.log(assets)
        res.send(template);
    }else{
        const assets = await getAssets(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        res.send(template)
    }
 
})
module.exports = router;