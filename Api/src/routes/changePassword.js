const { Router, response } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const  changePassword  = require('../services/changePassword.service')

/**
 * @swagger
 * /changepassword:
 *   post:
 *     summary: Cambia la propidedad 'password' del email dado.
 *     tags:
 *       - Change Password
 *     description: Le llega un Obj. con las propiedades email y password  y cambia a propiedad 'password' por el nuevo valor que le llega
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
 *                 password:
 *                   type: String
 *                   example: passwordTest@
 *          
 *     responses:
 *       200:
 *         description: Si el usuario existe DB se envia el correo y la ruta responde con un 'OK'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: OK
 *                     
 */


/**
 * @swagger
 * /changepassword:
 *   post:
 *     summary: Cambia la propidedad 'password' del email dado.
 *     tags:
 *       - Change Password
 *     description: Le llega un Obj. con las propiedades email y password  y cambia a propiedad 'password' por el nuevo valor que le llega
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
 *                 password:
 *                   type: String
 *                   example: passwordTest@
 *          
 *     responses:
 *       200:
 *         description: Si el usuario existe DB se envia el correo y la ruta responde con un 'OK'.
 *         content:
 *           application/json:
 *             schema:
 *               type: String
 *               example: OK
 *                     
 */




 router.post('/', async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let response = await changePassword(email, password)
    if(response === 'Email not found'){
        res.sendStatus(404)
    } else {
        res.status(200).send('Ok')
    }
})

module.exports = router;