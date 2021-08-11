const https = require("https");
const fs = require("fs");
const axios = require("axios");

var data = fs.readFileSync('../Api/src/services/videos.csv', 'utf8');
// var data = fs.readFileSync('./videos.csv', 'utf8');
var arrayData = data.split("\r\n").slice(1);

async function getAssets() {
    let assetsName = arrayData.map(i => "https://nv60dd5u3g.execute-api.us-east-1.amazonaws.com/development/tekal-game-asset-input?filename=" + i.replace(/^[0-9]+,/ , ""));
    let assets = assetsName.map(async v => {
        return await axios.get(v).then(res => res.data.body);
    })
    let allAssets = await Promise.all(assets).then(res => res);
    return allAssets;
}

module.exports = {getAssets};
