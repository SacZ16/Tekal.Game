const { Router } = require('express');
const router = Router();
const { putAssets, updateView, queryAllInfoUser } = require('../Controllers/dbFunctions');
const {endpoint} = require('../services/endpoint.service');

router.post('/', async (req, res) => {
    let info = req.body;
    let email = info[0];
    let urls = [];
    
    try {
        const userInfo = await queryAllInfoUser(email)
        const age = userInfo.Items[0].age
        const country = userInfo.Items[0].country
        for (let i = 2; i < info.length; i++) {
            var object = info[i];
            object.age = age
            object.mood = object.mood
            object.country = country
            object.pos = i - 2;
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
        ends.forEach(u => updateView(u))
        console.log(urls)
        res.json("asset added");
    }
    catch (error) {
        console.log(error);
    }
})


module.exports = router