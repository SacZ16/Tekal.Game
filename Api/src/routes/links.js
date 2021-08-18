const { Router } = require('express');
const router = Router();
const { getAssets } = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { videosNotSeen } = require('../services/notViewedVideos.service')

router.post('/', async (req, res) => {
    let { email } = req.body;
    console.log('body', req.body)
    let assetsFromDb = await videosNotSeen(email);
    const itemsFromDb = assetsFromDb.map(v => v.Items)

    const videosSorted= itemsFromDb.sort(function (x, y) {
        return x[0].views - y[0].views;
    });
    const videosSortedPK = videosSorted.map(v => v[0].PK)
    // console.log(videosSortedPK)
    let assets = await getAssets(videosSortedPK);//transforma en link
    let template = await templateFiller(assets);
    console.log(assets)
    //res.send(template);
})
module.exports = router;