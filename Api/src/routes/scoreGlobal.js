const { Router } = require('express');
const router = Router();


router.post('/', async (req, res) => {
    let {email} = req.body; 
    let {type}  = req.body;
    res.send(data);
})


module.exports = router;