const { Router } = require('express');
const { queryAllInfoUser } = require('../Controllers/dbFunctions');
const router = Router();


router.post('/', async (req, res) => {
    let { email } = req.body;
    try {
        if (email.includes('eyJhbGciOiJIUzI')) {
            let info = await queryAllInfoUser(email);
            let age = info.Items[0].age;
            res.send(age);
        } else {
            res.send('ok')
        }

    }
    catch (error) {
        res.send('ok')
    }
})

module.exports = router;