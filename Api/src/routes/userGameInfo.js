const { Router } = require('express');
const router = Router();
const {putUserGameItems} = require('../Controllers/dbFunctions');
const { endpointNoMemento } = require('../services/endpoint.service');;


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
            object.pos= i+1;
            answers.push(object.answer);
            let asset = endpointNoMemento(object.url);
            presentations.push(asset);
        }
        let data = {
            email: email,
            score: score,
            answer: answers,
            presentation: presentations,
            emotion: emotion

        }
        let games = await putUserGameItems(data);
        res.send(games);
    }
    catch(error) {
        console.log(error);
    }
})

module.exports = router