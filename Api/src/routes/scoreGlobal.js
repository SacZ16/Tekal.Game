const { Router } = require('express');
const { scanAllGamesType, scanAllGamesLowerThan } = require('../Controllers/dbFunctions');
const router = Router();

router.post('/', async (req, res) => {
    let { score } = req.body;
    let { type } = req.body;
    const allGames = await scanAllGamesType(type);
    const cantTotal = allGames.length;
    if (cantTotal > 0) {
        const gamesLower = await scanAllGamesLowerThan(score, type);
        const betterThan = (gamesLower * 100) / cantTotal;
        res.send({ betterThan: betterThan, type });
    } else {
        res.send({ betterThan: 100, type })
    }
})


module.exports = router;