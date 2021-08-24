const { Router } = require('express');
const router = Router();
const { loadEndpoints } = require('../services/assets.service');


/**
 * @swagger
 * /videoInfo:
 *   post:
 *     summary: Recibe un array en donde la posicion [0] es el email, en la posicion[1] es el score, y las siguientes posiciones son objetos con info de las url vistas en el juego 
 *     description: Realiza una busqueda en la Db utilizando el email, donde se trae la metadata del determinado usuario. Y luego con esta info mas la info recibida por body, realizando otras funciones, llena los datos que corresponden a cada SESSION# asset.
 *     responses:
 *       200:
 *         description: Carga la DB con la info del asset.
 */

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