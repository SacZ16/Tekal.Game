const axios = require("axios");

async function getAssets(array) {
    try{
        let assetsName = array.map(i => "https://nv60dd5u3g.execute-api.us-east-1.amazonaws.com/v1/tekal-game-asset-input?request_type=SINGLE_DOWNLOAD&filename=video/dataset-memento/videos/" + i.replace(/^[0-9]+,/ , ""));

        let assets = assetsName.map(async v => {
            return await axios.get(v).then(res => res.data.body);
        });
        let allAssets = await Promise.all(assets).then(res => res);
        return allAssets;

    }catch(err){
        console.log(err)

    }

}

async function getAssetsVideo(array) {
    try{
        let assetsName = array.map(i => "https://nv60dd5u3g.execute-api.us-east-1.amazonaws.com/v1/tekal-game-asset-input?request_type=SINGLE_DOWNLOAD&filename=video/" + i.replace(/^[0-9]+,/ , ""));

        let assets = assetsName.map(async v => {
            return await axios.get(v).then(res => res.data.body);
        });
        let allAssets = await Promise.all(assets).then(res => res);
        return allAssets;

    }catch(err){
        console.log(err)

    }

}

async function getAssetsImages(array) {
    try{
        let assetsName = array.map(i => "https://nv60dd5u3g.execute-api.us-east-1.amazonaws.com/v1/tekal-game-asset-input?request_type=SINGLE_DOWNLOAD&filename=image/" + i.replace(/^[0-9]+,/ , ""));

        let assets = assetsName.map(async v => {
            return await axios.get(v).then(res => res.data.body);
        });
        let allAssets = await Promise.all(assets).then(res => res);
        return allAssets;

    }catch(err){
        console.log(err)

    }

}


async function getListElements(){
    try{
        let resp = await axios.get("https://nv60dd5u3g.execute-api.us-east-1.amazonaws.com/v1/tekal-game-asset-input?request_type=LIST_ELEMENTS").then(res => (res.data.body));
        let json = JSON.parse(resp);
        let videos = json.videos;
        let images = json.images;
        videos.pop();
        let arrayConjunto = [videos, images];
        return arrayConjunto;

    }catch(err){
        console.log(err)
    }

}


module.exports = {getAssets, getAssetsVideo, getListElements, getAssetsImages };

