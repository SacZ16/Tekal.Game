const { Router } = require('express');
const router = Router();
const { gamesPlayed } = require("../Controllers/dbFunctions");


router.post('/', async (req, res) => {
    let {email} = req.body;
    let {type} = req.body;
    try {
        loadEndpoints(info);
        res.send("addedAsset");
    }
    catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router