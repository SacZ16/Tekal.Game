  
const { Router } = require('express');
const { getGameUser } = require('../Controllers/dbFunctions');
const router = Router();
const jwt = require ('jsonwebtoken');

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
    try{
        let {email} =req.body;
        var tokensendEmail = jwt.sign({ email: email, iat:25 }, 'prueba');
        const games =await getGameUser(tokensendEmail);
        const score =games.Items.map(o => parseInt(o.score));   
        // USUARIO NO JUGO               NO EXISTE
        if(!score.length){
            let averageScore = 0
            return res.status(200).json({ averageScore:averageScore });
        }
        const averageScore = score.reduce((a,b)=> a+b) / score.length;
        res.status(200).json({ averageScore:averageScore });
    }catch(err){
        res.send(err);
    }
})

module.exports = router;