const { viewedVideos, queryPK, order, orderNext } = require('../Controllers/dbFunctions');
const { notSeen } = require('./compareArray.service')



async function videosNotSeen(email) {
    try {
        const viewedVideos1 = await viewedVideos(email);
        //console.log(viewedVideos1);
        if(viewedVideos1.Items.length > 0){
            const PKviewed = new Set(viewedVideos1.Items.map(v => v.PK));
            const videosLessViews = await order(2000)
            const setVideos = videosLessViews.Items.map(v => v.PK);

            let array = [];
            let arrayVideos = array.concat(notSeen(setVideos,[...PKviewed],160));
            let LastEvaluatedKeyPK = videosLessViews.LastEvaluatedKey.PK;
            let LastEvaluatedKeyViews = videosLessViews.LastEvaluatedKey.views;

            while(arrayVideos.length < 160){
                let videosLessViewsNext = await orderNext(2000,LastEvaluatedKeyPK, LastEvaluatedKeyViews);
                let array2 = videosLessViewsNext.Items.map(v => v.PK);
                let arrayChunk = arrayVideos.concat(notSeen(array2,[...PKviewed],160));
                arrayVideos = arrayChunk;
                LastEvaluatedKeyPK = videosLessViewsNext.LastEvaluatedKey.PK;
                LastEvaluatedKeyViews = videosLessViewsNext.LastEvaluatedKey.views;
            }

            const videos = arrayVideos.map(async v => await queryPK(v));
            return Promise.all(videos);
        }else{
            const allVideos = await order(160);
            const setVideos = new Set(allVideos.Items.map(v => v.PK));

            const videos = [...setVideos].map(async v => await queryPK(v));
            return Promise.all(videos);
        }
    }catch (error) {
        console.log(error);
    }
}
//videosNotSeen("amapetrice@gmail.com")

module.exports = { videosNotSeen };