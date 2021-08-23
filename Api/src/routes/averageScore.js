const { Router } = require('express');
const { getGameUser } = require('../Controllers/dbFunctions');
const router = Router();

router.post('/', async (req,res) => {
    try{
        let {email} =req.body;
        const games =await getGameUser(email);
        const score =games.Items.map(o => parseInt(o.score));   
        const averageScore = score.reduce((a,b)=> a+b) / score.length;
        res.status(200).json({ averageScore:averageScore });
    }catch(err){
        res.send(err);
    }
})

module.exports = router;