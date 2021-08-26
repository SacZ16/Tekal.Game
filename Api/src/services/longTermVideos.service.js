const { gamesPlayed } = require("../Controllers/dbFunctions");
const moment = require("moment")
async function longTerm(email, type) {
    var tokensendEmail = jwt.sign({ email: email, iat:25 }, 'prueba');
    try {
        let games = await gamesPlayed(tokensendEmail);
        let gamesType = [];
        games.Items.forEach(g => {
            if (g.type === type && g.longTerm === true) {
                gamesType.push(g);
            }
        });
        let dates = gamesType.map(g => g.playedAt);
        let lastDate;
        for (let i = 0; i < dates.length; i++) {
            let max = new Date('0');//una fecha menor para arrancar a guardar el mayor
            let d = new Date(dates[i]);
            if (d > max) {
                max = d
            }
            lastDate = moment(max).format();
        }
        let lastGame;
        games.Items.forEach(g => {
            if (g.playedAt === lastDate) {
                lastGame = g;
            }
        })
        let lastPresentations = lastGame.presentations;
        let lastFillersSeen = [];
        lastPresentations.forEach(i => {
            if (i.category === "FILLER") {
                lastFillersSeen.push(i.id);
            }
        })
        return lastFillersSeen;
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { longTerm }