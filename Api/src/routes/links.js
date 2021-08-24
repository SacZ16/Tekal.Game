const { Router } = require('express');
const router = Router();
const { getAssets, getAssetsImages} = require('../services/csv.service.js');
const { templateFiller } = require('../services/templates.service.js');
const { assetNotSeen } = require('../services/notViewedVideos.service');
const { picker } = require('../services/templatePicker.service');

/**
 * @swagger
 * /links:
 *   post:
 *     summary: Recibe el email del usuario y el modo de juego, generando el template correspondiente.
 *     description: Realiza una busqueda en la Db utilizando el email para buscar que videos no haya el usuario en ese modo de juego, y luego de escoger un template random, lo llena con las urls correspondientes.
 *     responses:
 *       200:
 *         description: Devuelve al front el template que tiene que ver el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer, object
 *                 example: [39, 41, 86, [{url: "url", id: 10}, "vig"],[{url: "url2", id: 2}, "target"]]                     
 */
router.post('/', async (req, res) => {
    let { email } = req.body;
    let { mode } =req.body;
    let templateChoosen = picker();
    let assetsFromDb = await assetNotSeen(email,mode);
    const itemsFromDb = assetsFromDb.map(v => v.Items[0].PK)
    if(mode === 'image'){
        const assets = await getAssetsImages(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        console.log(assets)
        res.send(template);
    }else{
        const assets = await getAssets(itemsFromDb);//transforma en link
        let template = templateFiller(templateChoosen, assets);
        res.send(template)
    }
 
})
module.exports = router;