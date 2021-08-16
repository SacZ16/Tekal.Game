const { viewedVideos, queryAllAssets } = require('../Controllers/dbFunctions');

async function videosNotSeen(email){
    try{
        const viewedVideos1 = await viewedVideos(email);

        const PKviewed = new Set(viewedVideos1.Items.map(v => v.PK));
        const arrayViewed = Array.from(PKviewed);

        const allVideos = await queryAllAssets();
        const setVideos = new Set(allVideos.Items.map(v => v.PK));
        const arrayVideos = Array.from(setVideos);

        const notViewedVideos = arrayVideos.filter(n => !arrayViewed.includes(n));
        return notViewedVideos;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {videosNotSeen};