const { Router } = require('express');
const router = Router();
const { loadGameInfo } = require('../services/gameInfo.service');

/**
 * @swagger
 * /gameInfo:
 *   post:
 *     summary: Recibe un array en donde la posicion [0] es el email, en la posicion[1] es el score,la posicion [3] es la fecha y las siguientes posiciones son objetos con info de las url vistas en el juego 
 *     description: Carga la DB, con la info recolectada y arma los GAMES de la tabla con sus respectivos campos
 *     responses:
 *       200:
 *         description: Carga la DB con la info del game.
 */
router.post('/', async (req, res) => {
    let info = req.body;
    try {
        let games = await loadGameInfo(info);
        res.send(games);
    }
    catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;