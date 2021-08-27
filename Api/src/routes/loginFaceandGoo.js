const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const {putUserLogin, queryAllInfoUser } = require('../Controllers/dbFunctions.js')
const jwt = require ('jsonwebtoken')

/**
 * @swagger
 * /logingoogle:
 *   post:
 *     summary: Recibe un Obj con Email y Name provenietes del boton Facebook y Google.
 *     tags:
 *       - Login
 *     description: Verifica si el Email ya se encuentra en la DB, si no lo encuentra entonces crea un nuevo user con los datos provenientes del front. Pero si encutra el Email retorna la info almacenada en la Db.
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
 *                 name:
 *                   type: string
 *                   example: señor
 *     responses:
 *       200:
 *         description: Datos de usuario provenientes de la DB cuando el Email EXISTE
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 PK:
 *                   type: String
 *                   example: prueba@live.com
 *                 SK:
 *                   type: string
 *                   example: INFO#prueba@live.com
 *                 email:
 *                   type: String
 *                   example: prueba@live.com
 *                 name:
 *                   type: string
 *                   example: señor
 *                     
 */



 router.get('/', async (req, res) => {
    res.json('estas en facebook')
})

router.post('/', async (req, res) => {
    var { email, name, lastname } = req.body
    async function run() {
        var tokensendEmail = jwt.sign({ email: email, iat:25 }, 'prueba');
        console.log(email, 'PRIMERA')
        console.log(tokensendEmail, 'PRIMERA')
        let user = await queryAllInfoUser(tokensendEmail)
        if (!user.Items.length) {
            await putUserLogin({
                "PK": tokensendEmail,
                "SK": `INFO#${tokensendEmail}`,
                "email": tokensendEmail,
                "name": name,
                "lastname": lastname
            })
            let newuser = await queryAllInfoUser(tokensendEmail)
            newuser.check = true
            return newuser
        }

        else {
            console.log('nose que esta pasando', user)
            user.check = false
            return user
        }
    }
    res.json(await run())
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder