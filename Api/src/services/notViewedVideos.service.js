const { getSessions, queryPK, orderAsset, orderNextAsset } = require('../Controllers/dbFunctions');
const { notSeen } = require('./compareArray.service')



async function assetNotSeen(email,asset) {
    try {
        const viewedAssets = await getSessions(email);
        if(viewedAssets.Items.length > 0){
            const PKviewed = new Set(viewedAssets.Items.map(v => v.PK));
            const assetsLessViews = await orderAsset(1000,asset);
            const setAssets = assetsLessViews.Items.map(v => v.PK);

            let array = [];
            let arrayAssets = array.concat(notSeen(setAssets,[...PKviewed],160));
            if(assetsLessViews.LastEvaluatedKey){
                let LastEvaluatedKeyPK = assetsLessViews.LastEvaluatedKey.PK;
                let LastEvaluatedKeyViews = assetsLessViews.LastEvaluatedKey.views;
    
                while(arrayAssets.length < 160){//cambiar el 160 por la cantidad de videos target
                    let assetsLessViewsNext = await orderNextAsset(1000,LastEvaluatedKeyPK, LastEvaluatedKeyViews,asset);
                    let array2 = assetsLessViewsNext.Items.map(v => v.PK);
                    let arrayChunk = arrayAssets.concat(notSeen(array2,[...PKviewed],160));//tambien :D sofi rompehue
                    arrayAssets = arrayChunk;
                    LastEvaluatedKeyPK = videosLessViewsNext.LastEvaluatedKey.PK;
                    LastEvaluatedKeyViews = videosLessViewsNext.LastEvaluatedKey.views;
                }
                
                const videos = arrayAssets.map(async v => await queryPK(v));
                return Promise.all(videos);

            }else{
                const asset = arrayAssets.map(async v => await queryPK(v))
                return Promise.all(asset)
            }

        }else{
            const allAssets = await orderAsset(160,asset);
            const setAssets= new Set(allAssets.Items.map(v => v.PK));

            const videos = [...setAssets].map(async v => await queryPK(v));
            return Promise.all(videos);
        }
    }catch (error) {
        console.log(error);
    }
}

module.exports = { assetNotSeen };