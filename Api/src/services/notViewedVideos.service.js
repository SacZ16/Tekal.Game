const { viewedVideos, queryAllAssets, queryPK } = require('../Controllers/dbFunctions');

async function videosNotSeen(email) {
    try {
        const viewedVideos1 = await viewedVideos(email);
        // console.log(viewedVideos1);
        if(!typeof viewedVideos1 === "undefined"){
            const PKviewed = new Set(viewedVideos1.Items.map(v => v.PK));
            const arrayViewed = Array.from(PKviewed);

            const allVideos = await queryAllAssets(10000);
            const setVideos = new Set(allVideos.Items.map(v => v.PK));
            const arrayVideos = Array.from(setVideos);
                // let notViewedVideos = arrayVideos.filter(n => {if(notViewedVideos.length < 200){
                //     return !arrayViewed.includes(n)
                // }});
            const notViewedVideos = arrayVideos.filter(function(n) {
                if (this.count < 200 && !arrayViewed.includes(n)) {
                    return true;
                }
                return false;
                }, {count: 0});
            console.log(notViewedVideos)//ASI, NO. >:c REY....
        }
        else{
        const allVideos = await queryAllAssets(200);
        const setVideos = new Set(allVideos.Items.map(v => v.PK));
        const arrayVideos = Array.from(setVideos);
        // let caca = [];
        // for(let i=0; i < 200; i++){
        //     caca.push(allVideos.Items[i].PK)
        // }
        // console.log(caca),
        // console.log(allVideos)
        const videos = arrayVideos.map(async v => await queryPK(v));
        return Promise.all(videos);
    }}catch (error) {
        console.log(error);
    }
}
videosNotSeen("amapetrice@gmail.com")

module.exports = { videosNotSeen };