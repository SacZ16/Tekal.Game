const { Router } = require('express');
const router = Router()
const { putAssets } = require('../Controllers/dbFunctions')




router.post('/', async (req, res) => {
    let info = req.body; 
    try{
        for (let object in info){
            let data = await putAssets(object);
            res.send(data);
        }
    }
    catch(error){
        console.log(error);
    }
})


module.exports = router