const { Router } = require('express');
const router = Router();
const { loadGameInfo } = require('../services/gameInfo.service');

router.post('/', async (req, res) => {
    let info = req.body;
    console.log(info, 'AAAAAAAAAAAAAAA')
    try {
        if(info.length <= 2){
            console.log('BBBBBBBBBBBBBBBBBBBBBBBBB')
            return res.send('datos invalidos')
        }
        let games = await loadGameInfo(info);
        console.log(games)
        res.send(games);
    }
    catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;