const { Router, response } = require('express');
const router = Router();
const { queryAllInfoUser } = require('../Controllers/dbFunctions')

router.post('/', async (req,res) => {
    let email = req.body.email;
    let infoUser = await queryAllInfoUser(email)
    console.log(infoUser.Items[0].VerificationEmail)
    // if(infoUser.Items[0].VerificationEmail){

    // }
    res.send('AAAAAAAAAAAAAAA');
})


module.exports = router;