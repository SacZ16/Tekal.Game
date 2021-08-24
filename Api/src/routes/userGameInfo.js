const { Router } = require('express');
const router = Router();
const { putUserGameItems } = require('../Controllers/dbFunctions');
//const { endpointNoMemento, endpoint } = require('../services/endpoint.service');;

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
    let answers = [];
    let presentations = [];
    let emotion = info[2].mood;
    let email = info[0];
    let score = info[1];
    try {
        for (let i = 2; i < info.length; i++) {
            var object = info[i];
            object.pos = i + 1;
            answers.push(object.answer);
            let pkAssetsTarget = object.type === "image" ? endpointNoMemento(object.url) : endpoint(object.url);
            presentations.push(pkAssetsTarget);
        }
        let data = {
            email: email,
            score: score,
            answer: answers,
            presentation: presentations,
            emotion: emotion,
            type: info[2].type
        }
        let games = await putUserGameItems(data);
        res.send(games);
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = router