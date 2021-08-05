const { Router, response } = require('express');
const axios = require('axios').default;
const router = Router();
const bcrypt = require('bcrypt');
const {getallUsers,getUser,newUser}= require ('../Controllers/dbFunctions.js')



router.get('/', async (req, res) => {
res.json(await getallUsers())
})

router.post('/', async (req, res) => {
    const user =async ()=>{if(req.body.email.length>0){return await getUser(req.body)}
else{return {}}}
    const runUser= await user()
    if (!runUser.Item){
        return res.json({ error: 'Email no register', status:'400' })
    }
    else {const validPassword = await bcrypt.compare(req.body.password, runUser.Item.password);
    if (!validPassword) return res.json({ error: 'error', status:'400' })
    else{
        res.json({
            error: null,
            status: '200',
            userInfo:runUser.Item
        })
    }}
})

module.exports = router;

// recibir la ruta
// recibir el payload
// comprobar el payload
// responder