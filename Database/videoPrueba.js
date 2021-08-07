//put watcher => agrega un elemento string al array
//put anotaciones => agrega +1 al anotaciones

const {  createVideosTable,putVideo,putWasTargetVideo,putWatcherVideo,putHittedVideo, putViewVideo, queryAllVideos, getVideoInfo} = require('./Handlers/Videos');

const {  createImagesTable,putImage,putWasTargetImage,putWatcherImage,putHittedImage, putViewImage, queryAllImages, getImageInfo} = require('./Handlers/Images');

// createVideosTable()


// urlVideoId
// putVideo("sopaDePollo.mp4")


// //urlVideoId
// putView("sopaDeCarne.mp4")
// putWasTarget("sopaDeCarne.mp4")
// putHitted("sopaDeCarne.mp4")

// //urlVideoId y userId
// putWatcher("sopaDePollo.mp4","ivaertgfdkuhfdshfguhfdkugn@gmail.com")

// getVideoInfo("sopaDePollo.mp4")
// queryAllVideos()