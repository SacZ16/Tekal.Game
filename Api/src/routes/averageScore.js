const { Router } = require('express');
const { getGameUser } = require('../Controllers/dbFunctions');
const router = Router();


/**
 * @swagger
 * /averageScore:
 *   post:
 *     summary: Recibe el email del usuario, con este saca el puntaje promedio del mismo.
 *     description: Realiza una busqueda en la Db utilizando el email, donde se trae todos los GAMES que jugo el usuario y utiliza los distintos scores obetenidos para sacar el promedio.
 *     responses:
 *       200:
 *         description: Devuelve al front el puntaje promedio del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageScore:
 *                   type: integer
 *                   example: 10                        
 */
router.post('/', async (req,res) => {
        let {email} =req.body;
        const games =await getGameUser(email);
        if(games.Items.length){
        const score =games.Items.map(o => parseInt(o.score));   
        const averageScore = score.reduce((a,b)=> a+b) / score.length;
        return res.status(200).json({ averageScore:averageScore });
        } else {
            res.sendStatus(400)
        }
})

module.exports = router;