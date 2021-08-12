const { Router } = require('express');
const router = Router();
const {putUserGameItems} = require('../Controllers/dbFunctions')


router.post('/', async (req, res) => {
    let info = req.body;
    let answers = [];
    let presentations = [];
    let email = info[0];
    let score = info[1];
    try {
        for (let i = 2; i < info.length; i++) {
            var object = info[i];
            object.pos= i+1;
            answers.push(object.answer);
            presentations.push(object.url);
        }
        let data = {
            email: email,
            score: score,
            answer: answers,
            presentation: presentations
        }
        let games = await putUserGameItems(data);
        res.send(games);
    }
    catch(error) {
        console.log(error)
    }
})


module.exports = router