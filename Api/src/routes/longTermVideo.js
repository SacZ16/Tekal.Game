const { Router } = require('express');
const router = Router();
const { getAssetsImages, getAssets } = require('../services/csv.service');
const { longTerm } = require('../services/longTermVideos.service');
const { assetNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');
const { templateFillerLongTerm } = require('../services/templates.service');

router.post('/', async (req, res) => {
    let { email } = req.body;
    let { mode } = req.body;
    try {
        let fillerLastGame = await longTerm(email, mode);
        console.log("lastGame", fillerLastGame);
        let template = picker();
        console.log(template);
        let cantNoTargets = template[2];
        let assetsFromDb = await assetNotSeen(email, mode, cantNoTargets);
        const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK);
        if (mode === 'image') {
            const assetsNoTarget = await getAssetsImages(itemsFromDb);//transforma en link
            const assetsTarget = await getAssetsImages(fillerLastGame);//transforma en link
            let templateFinal = templateFillerLongTerm(template, assetsTarget, assetsNoTarget);
            res.send(templateFinal);
        } else {
            const assetsNoTarget = await getAssets(itemsFromDb);//transforma en link
            const assetsTarget = await getAssets(fillerLastGame);//transforma en link
            let templateFinal = templateFillerLongTerm(template, assetsTarget, assetsNoTarget);
            res.send(templateFinal);
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router