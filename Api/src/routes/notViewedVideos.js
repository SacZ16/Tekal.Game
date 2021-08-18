const { Router, response } = require('express');
const router = Router();
const { viewedVideos, queryAllAssets } = require('../Controllers/dbFunctions.js')


router.post('/', async (req,res) => {
    try{
        const viewedVideos1 = await viewedVideos(req.body.email);

        let PKviewed = new Set(viewedVideos1.Items.map(v => v.PK));
        let arrayViewed = Array.from(PKviewed);

        const allVideos = await queryAllAssets()
        const setVideos = new Set(allVideos.Items.map(v => v.PK))
        let arrayVideos = Array.from(setVideos);

        const notViewedVideos = arrayVideos.filter(n => !arrayViewed.includes(n))
        console.log(notViewedVideos)
        res.send("hola")

    }catch(err){
        console.log(err)
    }
})


module.exports = router;