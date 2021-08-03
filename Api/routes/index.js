const { Router } = require('express');
const router = Router()

router.get('/prueba', (req, res) => {
    res.send('HOLAAAAAAAAAA FUNCIONAAAAAAAAAAA')
})



module.exports = router;