const { Router, response } = require('express');
const router = Router();
const { viewedVideos, queryAllAssets } = require('../Controllers/dbFunctions.js')


router.post('/', async (req,res) => {
    //console.log(req.body.email)
    try{
        const viewedVideos1 = await viewedVideos(req.body.email)
        //console.log(viewedVideos1)
        let PKviewed = viewedVideos1.Items.map(v => v.PK)
        console.log(PKviewed)
        // const allVideos = await queryAllAssets()
        // console.log(allVideos)
        // PKvideos = allVideos.map(v => v.PK)
        // const notViewedVideos = PKvideos.filter(n => !PKviewed.includes(n))
        // console.log(notViewedVideos)
        res.send("hola")

    }catch(err){
        console.log(err)
    }


})


module.exports = router;