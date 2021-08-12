const { Router } = require('express');
const router = Router();
const {getAssets} = require('../services/csv.service.js');
const {templateFiller} = require('../services/templates.service.js')

router.get('/', async (_req,res) => {
    let assets = await getAssets();
    let template = await templateFiller(assets);
    res.send(template);
})
module.exports = router;