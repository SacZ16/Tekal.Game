const axios = require("axios");

async function getAssets(array) {
    let assetsName = array.map(i => "https://nv60dd5u3g.execute-api.us-east-1.amazonaws.com/development/tekal-game-asset-input?filename=" + i.replace(/^[0-9]+,/ , ""));
    let assets = assetsName.map(async v => {
        return await axios.get(v).then(res => res.data.body);
    })
    let allAssets = await Promise.all(assets).then(res => res);
    return allAssets;
}

module.exports = {getAssets};
