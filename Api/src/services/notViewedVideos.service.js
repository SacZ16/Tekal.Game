const { getSessions, queryPK, orderVideo, orderNextVideo } = require('../Controllers/dbFunctions');
const { notSeen } = require('./compareArray.service')



async function videosNotSeen(email) {
    try {
        const viewedVideos = await getSessions(email);
        //console.log(viewedVideos1);
        if(viewedVideos.Items.length > 0){
            const PKviewed = new Set(viewedVideos.Items.map(v => v.PK));
            const videosLessViews = await orderVideo(1000);
            const setVideos = videosLessViews.Items.map(v => v.PK);

            let array = [];
            let arrayVideos = array.concat(notSeen(setVideos,[...PKviewed],160));
            let LastEvaluatedKeyPK = videosLessViews.LastEvaluatedKey.PK;
            let LastEvaluatedKeyViews = videosLessViews.LastEvaluatedKey.views;

            while(arrayVideos.length < 160){//cambiar el 160 por la cantidad de videos target
                let videosLessViewsNext = await orderNextVideo(1000,LastEvaluatedKeyPK, LastEvaluatedKeyViews);
                let array2 = videosLessViewsNext.Items.map(v => v.PK);
                let arrayChunk = arrayVideos.concat(notSeen(array2,[...PKviewed],160));//tambien :D sofi rompehue
                arrayVideos = arrayChunk;
                LastEvaluatedKeyPK = videosLessViewsNext.LastEvaluatedKey.PK;
                LastEvaluatedKeyViews = videosLessViewsNext.LastEvaluatedKey.views;
            }

            const videos = arrayVideos.map(async v => await queryPK(v));
            return Promise.all(videos);
        }else{
            const allVideos = await orderVideo(160);
            const setVideos = new Set(allVideos.Items.map(v => v.PK));

            const videos = [...setVideos].map(async v => await queryPK(v));
            return Promise.all(videos);
        }
    }catch (error) {
        console.log(error);
    }
}

module.exports = { videosNotSeen };