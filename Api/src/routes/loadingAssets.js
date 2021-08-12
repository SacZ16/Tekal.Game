const { Router } = require('express');
const router = Router();
const fs = require("fs");
const {putPKAssets}= require('../Controllers/dbFunctions');

var data = fs.readFileSync('../Api/src/services/videos.csv', 'utf8');
// var data = fs.readFileSync('./videos.csv', 'utf8');
var arrayData = data.split("\r\n").slice(1);

router.get('/', async(req, res) => {
    arrayData.forEach(async (a, i) =>  await putPKAssets(a.replace(/^[0-9]+,/ , ""), i.toString()))
    res.send('Assets Created')
});


module.exports = router;