const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const { putPKAssetsVideos } = require("../Controllers/dbFunctions");

// var data = fs.readFileSync("../Api/src/services/videos10.csv", "utf8");
var data = fs.readFileSync(
  path.join(__dirname, "../services/videos10.csv"),
  "utf8"
);
// var data = fs.readFileSync('./videos.csv', 'utf8');
var arrayData = data.split("\r\n").slice(1);

router.get("/", async (_req, res) => {
  arrayData.forEach(
    async (a) =>
      await putPKAssetsVideos(
        a.replace(/^[0-9]+,/, "") /*a.replace(/^[0-9]+,/ , "")*/
      )
  );
  res.send("Assets Created");
});

module.exports = router;
