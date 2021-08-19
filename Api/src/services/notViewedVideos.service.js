const { viewedVideos, queryAllAssets, queryPK, order } = require('../Controllers/dbFunctions');

async function videosNotSeen(email) {
    try {
        const viewedVideos1 = await viewedVideos(email);
        // console.log(viewedVideos1);
        if(!typeof viewedVideos1 === "undefined"){
            const PKviewed = new Set(viewedVideos1.Items.map(v => v.PK));
            const arrayViewed = Array.from(PKviewed);

            const thousandVideosOrdered = await order(1000);
            const setVideos = new Set(thousandVideosOrdered.Items.map(v => v.PK));
            
            const notViewedVideos = [...setVideos].filter(function(n) {
                if (this.count < 200 && !arrayViewed.includes(n)) {
                    return true;
                }
                return false;
                }, {count: 0});
            console.log(notViewedVideos)//ASI, NO. >:c REY....
        }
        else{

        const allVideos = await order(160);
        const setVideos = new Set(allVideos.Items.map(v => v.PK));

        const videos = [...setVideos].map(async v => await queryPK(v));
        return Promise.all(videos);
    }}catch (error) {
        console.log(error);
    }
}
// videosNotSeen("amapetrice@gmail.com")

module.exports = { videosNotSeen };