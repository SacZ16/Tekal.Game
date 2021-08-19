const { viewedVideos, queryAllAssets, queryPK, order } = require('../Controllers/dbFunctions');
const { notSeen } = require('./compareArray.service')



async function videosNotSeen(email) {
    try {
        const viewedVideos1 = await viewedVideos(email);
        //console.log(viewedVideos1);
        if(viewedVideos1.Items.length > 0){
            const PKviewed = new Set(viewedVideos1.Items.map(v => v.PK));
            const videosLessViews = await order(4000)
            console.log(videosLessViews.Count)
            const setVideos = videosLessViews.Items.map(v => v.PK);
            const videosNotSeen = notSeen(setVideos,[...PKviewed],160)
            //console.log(videosNotSeen)
            const videos = videosNotSeen.map(async v => await queryPK(v));
            return Promise.all(videos);
            



            
        }else{
        //     const thousandVideosOrdered = await order(1000);
        //     const setVideos = new Set(thousandVideosOrdered.Items.map(v => v.PK));
            
        //     const notViewedVideos = [...setVideos].filter(function(n) {
        //         if (this.count < 200 && !arrayViewed.includes(n)) {
        //             return true;
        //         }
        //         return false;
        //         }, {count: 0});
        //     console.log(notViewedVideos)//ASI, NO. >:c REY....
        // }
        //else{

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