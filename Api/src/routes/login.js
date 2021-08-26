const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const { getallUsers, queryAllInfoUser } = require('../Controllers/dbFunctions.js')

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Recibe un Obj. con las propiedades Email y Password y responde con  un Obj.
 *     tags:
 *       - Login
 *     description: Realiza una busqueda en la Db utilizando el Email, para poder comprobar si existe ese Correo, en caso que exista comprueba si la contraseña ingresada es correcta, si lo es entoces responde con un array que contiene un Objeto en cual tiene los datos para front.
 *     parameters:
 *       - in: path
 *         name: Email
 *         required: true
 *         description: Email del usuario que se Registro.
 *         schema:
 *           type: String
 *       - in: path
 *         name: Password
 *         required: true
 *         description: Contraseña del usuario que se Registro.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Datos de usuario provenientes de la DB cuando el Email y la Password son CORRECTOS
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: String
 *                     example: prueba@live.com
 *                   password:
 *                     type: string
 *                     example: ''
 *                   country:
 *                     type: String
 *                     example: Argentina
 *                   name:
 *                     type: string
 *                     example: señor
 *                   lastname:
 *                     type: string
 *                     example: prueba
 *                   age:
 *                     type: string
 *                     example: 20-03-2001
 *                   gender:
 *                     type: string
 *                     example: Male
 *                   ethnicity:
 *                     type: string
 *                     example: ''
 *                   city:
 *                     type: string
 *                     example: Cordoba
 *                   PK:
 *                     type: string
 *                     example: prueba@live.com
 *                   SK:
 *                     type: string
 *                     example: INFO#prueba@live.com
 *                   VerificationEmail:
 *                     type: boolean
 *                     example: false
 */


router.get('/', async (req, res) => {
res.json(await getallUsers())
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Recibe un Obj. con las propiedades Email y Password y responde con  un Obj.
 *     tags:
 *       - Login
 *     description: Realiza una busqueda en la Db utilizando el Email, para poder comprobar si existe ese Correo, en caso que exista comprueba si la contraseña ingresada es correcta, si lo es entoces responde con un array que contiene un Objeto en cual tiene los datos para front.
 *     parameters:
 *       - in: path
 *         name: Email
 *         required: true
 *         description: Email del usuario que se Registro.
 *         schema:
 *           type: String
 *       - in: path
 *         name: Password
 *         required: true
 *         description: Contraseña del usuario que se Registro.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Datos de usuario provenientes de la DB cuando el Email y la Password son CORRECTOS
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: String
 *                     example: prueba@live.com
 *                   password:
 *                     type: string
 *                     example: ''
 *                   country:
 *                     type: String
 *                     example: Argentina
 *                   name:
 *                     type: string
 *                     example: señor
 *                   lastname:
 *                     type: string
 *                     example: prueba
 *                   age:
 *                     type: string
 *                     example: 20-03-2001
 *                   gender:
 *                     type: string
 *                     example: Male
 *                   ethnicity:
 *                     type: string
 *                     example: ''
 *                   city:
 *                     type: string
 *                     example: Cordoba
 *                   PK:
 *                     type: string
 *                     example: prueba@live.com
 *                   SK:
 *                     type: string
 *                     example: INFO#prueba@live.com
 *                   VerificationEmail:
 *                     type: boolean
 *                     example: false
 */

router.post('/', async (req, res) => {
    const user =async ()=>{if(req.body.email.length>0){return await queryAllInfoUser(req.body.email)}
else{return {}}}
    console.log(await user())
    let runUser= await user()
    console.log(runUser)
    if (!runUser.Items.length){
        return res.json({ error: 'Email no register', status:'400' })
    }
    else {const validPassword = await bcrypt.compare(req.body.password, runUser.Items[0].password);
    if (!validPassword) return res.json({ error: 'error', status:'400' })
    else{
        runUser.Items[0].password = ''
        console.log(runUser.Items)
        res.json(runUser.Items)
    }}
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder
