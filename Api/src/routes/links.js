const { Router } = require('express');
const router = Router();
const { getAssets, getListElements, getAssetsVideo} = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { videosNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');

router.post('/', async (req, res) => {
    let { email } = req.body;
   
    let templateChoosen = picker();

    let array = await getListElements();
    let videos = array[0];

    let links = await getAssetsVideo(videos)
    console.log(links)

    // let assetsFromDb = await videosNotSeen(email);
 
    // const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)
    // console.log(itemsFromDb);

    // let assets = await getAssets(itemsFromDb);//transforma en link
 
    let template = templateFiller(templateChoosen, links);
    //let no = assetsFromDb.map(v => v.Items)
    //console.log(no)
    res.send(template);
})
module.exports = router;