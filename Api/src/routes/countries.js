const { Router, response } = require('express');
const router = Router();
const {AskCountries} = require('../services/countries.service.js')


router.get('/', async (_req,res) => {
    let country = await AskCountries();
    if(!country){
        res.status(404).send('No countries');
    }
    res.send(country);
})


module.exports = router;