const { Router } = require('express');
const { scores, lowerScore, lowerScoreNext, scoresNext } = require('../Controllers/dbFunctions');
const router = Router();

router.post('/', async (req, res) => {
    let { score } = req.body;
    let { type } = req.body;
    let gamesLower = 0
    let cantTotal = 0
    let allGames = await scores(type);
    cantTotal += allGames.Count
    while (allGames.LastEvaluatedKey) {
        scoreeNext = await scoresNext(allGames.LastEvaluatedKey.score, allGames.LastEvaluatedKey.SK, allGames.LastEvaluatedKey.PK, type)
        cantTotal += scoreeNext.Count
        allGames = scoreeNext
    }

    if (cantTotal > 0) {
        let lowerScoree = await lowerScore(type, score);
        gamesLower += lowerScoree.Count;

        while (lowerScoree.LastEvaluatedKey) {
            const scoreLEK = lowerScoree.LastEvaluatedKey.score;
            const skLEK = lowerScoree.LastEvaluatedKey.SK;
            const pkLEK = lowerScoree.LastEvaluatedKey.PK;
            let lowerScoreeNext = await lowerScoreNext(score, scoreLEK, skLEK, pkLEK, type)
            gamesLower += lowerScoreeNext.Count
            lowerScoree = lowerScoreeNext
        }
        let betterThan = ((gamesLower * 100) / cantTotal);
        res.send({ betterThan: betterThan, type: type });
    } else {
        res.send({ betterThan: 100, type: type })
    }
})


module.exports = router;