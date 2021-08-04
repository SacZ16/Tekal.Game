const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const {getallUsers,getUser,newUser}= require ('../Controllers/dbFunctions.js')



router.get('/', async (req, res) => {
    // getUser()
    // newUser()
res.json(await getallUsers())
})

router.post('/', async (req, res) => {

    const user = (await getUser(req.body))
    const validPassword = await bcrypt.compare(req.body.password, user.Item.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    else{
        res.json({
            error: null,
            data: 'exito bienvenido'
        })
    }
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder