const { Router } = require('express');
const router = Router();
const { getAssets, getListElements, getAssetsVideo, getAssetsImages} = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { videosNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');

router.post('/', async (req, res) => {
    let { email } = req.body;
   
    let templateChoosen = picker();

    // let array = await getListElements();
    // let videos = array[1];

    // let links = await getAssetsImages(videos)
    // console.log(links)

    let assetsFromDb = await videosNotSeen(email);
 
    const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)
    // console.log(itemsFromDb);

    let assets = await getAssets(itemsFromDb);//transforma en link
 
    let template = templateFiller(templateChoosen, assets);
    //let no = assetsFromDb.map(v => v.Items)
    //console.log(no)
    console.log(assets)
    res.send(template);
})
module.exports = router;