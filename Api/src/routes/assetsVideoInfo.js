const { Router } = require('express');
const router = Router();
const { loadEndpoints } = require('../services/assets.service');

router.post('/', async (req, res) => {
    let info = req.body;
    try {
        loadEndpoints(info);
        res.send("addedAsset");
    }
    catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router