require('dotenv').config();
const axios = require("axios");
const {
    KEY_TEKAL_ASSETS,
} = process.env;

async function getAssets(array) {
    let assetsName = array.map(i => `${KEY_TEKAL_ASSETS}` + i.replace(/^[0-9]+,/ , ""));
    let assets = assetsName.map(async v => {
        return await axios.get(v).then(res => res.data.body);
    })
    let allAssets = await Promise.all(assets).then(res => res);
    return allAssets;
}

module.exports = {getAssets};
