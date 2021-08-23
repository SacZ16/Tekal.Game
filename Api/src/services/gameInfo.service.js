const { putUserGameItems } = require("../Controllers/dbFunctions");
const { endpointNoMemento, endpoint } = require("./endpoint.service");

function loadGameInfo(array){
    let answers = [];
    let presentations = [];
    let emotion = array[2].mood;
    let email = array[0];
    let score = array[1];
    for (let i = 2; i < array.length; i++) {
        var object = array[i];
        object.pos= i+1;
        answers.push(object.answer);
        let pkAssetsTarget = object.type === "image"? endpointNoMemento(object.url) : endpoint(object.url);
        presentations.push(pkAssetsTarget);
    }
    let data = {
        email: email,
        score: score,
        answer: answers,
        presentation: presentations,
        emotion: emotion
    }
    let games = await putUserGameItems(data);
    return games;
}

module.exports = { loadGameInfo }