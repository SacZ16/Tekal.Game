const { gamesPlayed } = require("../Controllers/dbFunctions");
const moment = require("moment")
async function longTerm(email, type){
    try{
        let games = await gamesPlayed(email);
        let gamesType = [];
        games.Items.forEach(g => {if(g.type === type){
            gamesType.push(g);
        }});
        let dates = gamesType.map(g => g.playedAt);
        let lastDate;
        for(let i = 0; i < dates.length; i++){
            let max = new Date('0');//una fecha menor para arrancar a guardar el mayor
            let d = new Date(dates[i]);
            if(d > max){
                max = d
            }
            lastDate = moment(max).format();
        }
        let lastGame;
        games.Items.forEach(g => {if(g.playedAt === lastDate){
            lastGame = g;
        }}) 
        let lastPresentations = lastGame.presentations;
        let lastFillersSeen = [];
        lastPresentations.forEach(i => {if(i.category === "filler"){
            lastFillersSeen.push(i.id);
        }})
        console.log(lastFillersSeen);
        return lastFillersSeen;
    }
    catch(err){
        console.log(err)
    }
}

longTerm("payerasangel@gmail.com","image")