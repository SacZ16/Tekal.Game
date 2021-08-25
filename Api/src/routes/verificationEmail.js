const { Router, response } = require('express');
const router = Router();
const {verificationEmail} = require('../services/register.service')


/**
 * @swagger
 * /verification:
 *   post:
 *     summary: Cambia la propiedad 'VerificationEmail' de un usuario que se encuentra en la Db de su estado false a TRUE.
 *     tags:
 *       - Verification
 *     description: Verifica si el usuario se encuentra dentro de la DB si no lo encuentra responde con 'This email is not registered', si lo encuentra pero su propiedad 'VerificationEmail' esta en TRUE responde con 'Email already verified' y en el caso que se encuentra el usuario y su propiedad 'VerificationEmail' esta en FALSE, entoces cambia el valor de la Propiedad a TRUE.  
 *     parameters:
 *       - in: path
 *         name: Obj
 *         required: true
 *         description: Objeto que le llega por Body desde el Front.
 *         schema:
 *           type: object
 *           properties:
 *                 email:
 *                   type: String
 *                   example: prueba@live.com
 *          
 *     responses:
 *       200:
 *         description: Si el usuario tiene la propiedad VerificationEmail en 'false' la ruta responde con un 'OK'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: OK
 *       201:
 *         description: Si el usuario NO se encuentra en la DB a ruta responde con un 'This email is not registered'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: 'This email is not registered'
 *       202:
 *         description: Si el usuario tiene la propiedad VerificationEmail en 'true' la ruta responde con un 'Email already verified'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: Email already verified
 *                     
 */

router.post('/', async (req,res) => {
    let email = req.body.email
    let response = await verificationEmail(email)
    console.log(response)
    if(response === 'Error' || response === undefined){
        res.send('This email is not registered')
    }
    if(response === 'Email already verified'){
        res.send('Email already verified')
    }
    res.send('Ok')
})



module.exports = router;