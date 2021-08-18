const { Router } = require('express');
const router = Router();
const { getAssets } = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { videosNotSeen } = require('../services/notViewedVideos.service')

router.post('/', async (req, res) => {
    let { email } = req.body;
    console.log('body', req.body)
    let assetsFromDb = await videosNotSeen(email);
    console.log("AAAAAAAAAAAAA",assetsFromDb)
    let assets = await getAssets(assetsFromDb);//transforma en link
    let template = await templateFiller(assets);

    res.send(template);
})
module.exports = router;