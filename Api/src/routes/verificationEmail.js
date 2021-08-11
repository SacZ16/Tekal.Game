const { Router } = require('express');
const router = Router()
const { updateEmailVerification } = require('../Controllers/dbFunctions')

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/', (req, res) => {
    updateEmailVerification(req.body.email)
    res.json(req.body)
})

module.exports = router;