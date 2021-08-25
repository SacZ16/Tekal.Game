const { Router, response } = require('express');
const router = Router();
const {AskCountries} = require('../services/countries.service.js')


router.get('/', async (_req,res) => {

    res.send('holaaaaaaaaaaaaaaaaa');
})


module.exports = router;