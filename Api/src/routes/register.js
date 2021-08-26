const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const { registerUser, sedEmail } = require('../services/register.service.js')
const { newUser, getallUsers, queryAllInfoUser, putUserInfoRegisterItems } = require('../Controllers/dbFunctions.js')

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Recibe un Obj con lo datos del nuevo usuario y lo crea en la DB.
 *     tags:
 *       - Register   
 *     description: Verifica si el correo se encuentra ya registrado en la Db, si lo está corta la ejecucion. En el caso que no exista el Email, la funcion 'registerUser' crea al nuevo usuario, para mas tarde  'putUserInfoRegisterItems' encargarse de agregar los nuevos datos provenientes de formulario del front. Mas tarde se envia un Email
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
 *                   type: string
 *                   example: ''
 *                 country:
 *                   type: String
 *                   example: Argentina
 *                 name:
 *                   type: string
 *                   example: señor
 *                 lastname:
 *                   type: string
 *                   example: prueba
 *                 age:
 *                   type: string
 *                   example: 20-03-2001
 *                 gender:
 *                   type: string
 *                   example: Male
 *                 ethnicity:
 *                   type: string
 *                   example: ''
 *                 city:
 *                   type: string
 *                   example: Cordoba
 *                 PK:
 *                   type: string
 *                   example: prueba@live.com
 *                 SK:
 *                   type: string
 *                   example: INFO#prueba@live.com
 *                 VerificationEmail:
 *                   type: boolean
 *                   example: false
 *     responses:
 *       200:
 *         description: Si el usuario no esta Regitrado y es necesario crearlo entonces devuelve un obj.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                     
 */

router.get('/', (req, res) => {
    getallUsers()
    // getUser()
    // newUser()
    res.json('Estas en Test User')
})

router.post('/', async (req, res) => {

    const user = await queryAllInfoUser(req.body.email)
    if (!user.Items.length) {
        const datos = req.body
        console.log('datos', datos)
        if (!datos.email || !datos.password) throw new Error({ error: 'datos invalidos' })
        var response = await registerUser(datos)
        // console.log(response)
        await sedEmail(req.body.email)
        await putUserInfoRegisterItems(datos)
        res.status(201).json({ status: true, data: response })
    }
    else { res.json({ status: false }) }
})

module.exports = router;