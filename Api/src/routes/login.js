const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const {getallUsers,getUser,newUser}= require ('../Controllers/dbFunctions.js')



router.get('/', async (req, res) => {
res.json(await getallUsers())
})

router.post('/', async (req, res) => {
    const user = (await getUser(req.body))
    if (!user.Item){
        return res.json({ error: 'Email no register', status:'400' })
    }
    else {const validPassword = await bcrypt.compare(req.body.password, user.Item.password);
    if (!validPassword) return res.status(400).json({ error: 'error', status:'400' })
    else{
        res.json({
            error: null,
            status: '200'
        })
    }}
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder