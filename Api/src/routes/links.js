const { Router } = require('express');
const router = Router();
const {getAssets} = require('../services/csv.service.js')


router.get('/', async (_req,res) => {
    let assets = await getAssets();
    res.send(assets);
})


module.exports = router;