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


//

router.post('/', async (req, res) => {
    let info = req.body;
    if(info.length){
        let games = await loadGameInfo(info);
        return res.status(200).send(games);
    } else{
        res.status(400).send(error);
        }
    }
);

module.exports = router;