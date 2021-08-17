const { Router } = require('express');
const router = Router();
const { putAssets } = require('../Controllers/dbFunctions');
const {endpoint} = require('../services/endpoint.service');

router.post('/', async (req, res) => {
    let info = req.body;
    let email = info[0]
    let urls = [];
    
    try {
        for (let i = 2; i < info.length; i++) {
            var object = info[i];
            object.pos = i + 1;
            if (urls.includes(object.url)) {
                let index = urls.indexOf(object.url) + 1
                object.repeated = true;
                object.pos_1st = object.pos - index;
                object.lag = object.pos - object.pos_1st;
            } else {
                urls.push(object.url);
                object.repeated = false;
            }
            await putAssets(email, object);
        }
        const ends = urls.map(u => endpoint(u));
        console.log(ends)
        res.json("asset added");
    }
    catch (error) {
        console.log(error);
    }
})


module.exports = router