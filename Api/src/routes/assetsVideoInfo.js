const { Router } = require('express');
//const {endpoint, endpointNoMemento} = require('../services/endpoint.service');
//const {endpoint, endpointNoMemento} = require('../../src/services/endPoint.service');
const { putAssets, updateView, queryAllInfoUser, updateAnnotationsCorrect } = require('../Controllers/dbFunctions');
const router = Router();

function endpoint(url){   // data memento
    let string2 = url.slice(72);
    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
        }
        else {
            return asset.slice(29);
        }
    }
}

function endpointNoMemento(url){ 
    let string2 = url.slice(78);
    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
        }else{
            return asset;
        } 
    }
}
   
router.post('/', async (req, res) => {
    let info = req.body;
    let email = info[0];
    let urls = [];
    try {
        const userInfo = await queryAllInfoUser(email);
        const age = userInfo.Items[0].age;
        const country = userInfo.Items[0].country;
        for (let i = 2; i < info.length; i++) {
            var object = info[i];
            object.age = age;
            object.mood = object.mood;
            object.country = country;
            object.pos = i - 2;
            let pkAssetsTarget = info[i].type === "image"? endpointNoMemento(info[i].url) : endpoint(info[i].url);
            object.url = pkAssetsTarget;
            if (info[i].category === "target"){
                updateView(pkAssetsTarget);
            }
            if (info[i].category === "target_repeat" && info[i].answer == 1){
                updateAnnotationsCorrect(pkAssetsTarget);
            }
            if (urls.includes(pkAssetsTarget)) {
                let index = urls.indexOf(pkAssetsTarget) + 1;
                object.repeated = true;
                object.pos_1st = object.pos - index;
                object.lag = object.pos - object.pos_1st;
            } else {
                urls.push(pkAssetsTarget);
                object.repeated = false;
            }
            await putAssets(email, object);
        }
        res.send("addedAsset");
    }
    catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router