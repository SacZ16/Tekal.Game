
const { Router, response } = require('express');
const router = Router();
const { queryAllInfoUser} = require('../Controllers/dbFunctions')
const {sendEmailForPassword} = require('../services/register.service')



/**
 * @swagger
 * /verificationchangepassword:
 *   post:
 *     summary: Envia un Correo al Email que le llega desde el body.
 *     tags:
 *       - Verification
 *     description: Le llega por body un Obj. con la propiedad Email y este se encuentra registrado en la DB entoces la ruta le envia un correo al email dado y responde con un 'OK', en el caso que no encuetre el correo responde con un 'Email not registered'
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
 *         description: Si el usuario existe DB se envia el correo y la ruta responde con un 'OK'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: OK
 *       201:
 *         description: Si el usuario NO existe DB la ruta responde con un 'Email not registered'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: 'Email not registered'
 *                     
 */
router.post('/', async (req,res) => {
    let email = req.body.email
    let response = await queryAllInfoUser(email)
    if(response.Items.length){
        await sendEmailForPassword(email);
        res.send('Ok')
    } else {
        res.send('Email not registered')
    }
})



module.exports = router;