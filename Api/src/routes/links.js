const { Router } = require('express');
const router = Router();
const { getAssets, getListElements, getAssetsVideo, getAssetsImages} = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { assetNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');

router.post('/', async (req, res) => {
    let { email } = req.body;
    let { mode } =req.body;
   
    let templateChoosen = picker();
    //console.log(mode)

    //let array = await getListElements();
    //let videos = array[0];
    

    //let links = await getAssetsImages(videos)
    // console.log(links)

    let assetsFromDb = await assetNotSeen(email,mode);
 
    const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)
    // console.log(itemsFromDb);
    if(mode === 'image'){
        const assets = await getAssetsImages(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        //let no = assetsFromDb.map(v => v.Items)
        //console.log(no)
        console.log(assets)
        res.send(template);
    }else{
        const assets = await getAssets(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        //let no = assetsFromDb.map(v => v.Items)
        //console.log(no)
        console.log(assets)
        res.send(template)
    }
 
})
module.exports = router;