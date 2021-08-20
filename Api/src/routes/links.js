const { Router } = require('express');
const router = Router();
const { getAssets } = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { videosNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');

router.post('/', async (req, res) => {
    let { email } = req.body;
   
    let templateChoosen = picker();

    let assetsFromDb = await videosNotSeen(email);
    // console.log(assetsFromDb);
    const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)

    let assets = await getAssets(itemsFromDb);//transforma en link
 
    let template = templateFiller(templateChoosen, assets);
    //let no = assetsFromDb.map(v => v.Items)
    //console.log(no)
    res.send(template);
})
module.exports = router;