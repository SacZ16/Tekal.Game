const { Router } = require('express');
const router = Router();
const { getAssets, getAssetsImages } = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { assetNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');
const jwt = require ('jsonwebtoken');

router.post('/', async (req, res) => {
    let { email } = req.body;
    let { mode } = req.body;
    var tokensendEmail = email;
    let templateChoosen = picker();
    let assetsFromDb = await assetNotSeen(tokensendEmail, mode, 160);
    const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)
    if (mode === 'image') {
        const assets = await getAssetsImages(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        // console.log(assets)
        res.send(template);
    } else {
        const assets = await getAssets(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        res.send(template);
    }

})
module.exports = router;