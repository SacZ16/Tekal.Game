const { putUserGameItems } = require("../Controllers/dbFunctions");
const { endpointNoMemento, endpoint, endpoint1 } = require("./endpoint.service");
const jwt = require ('jsonwebtoken');


async function loadGameInfo(array) {
    let answers = [];
    let presentations = [];
    let emotion = array[2].mood;
    let email = array[0];
    var tokensendEmail = jwt.sign({ email: email, iat:25 }, 'prueba');
    let score = array[1];
    let date = array[2].date;
    for (let i = 2; i < array.length; i++) {
        var object = array[i];
        let category = array[i].category
        object.pos = i + 1;
        answers.push(object.answer);
        let pkAssetsTarget = object.type === "image" ? endpointNoMemento(object.url) : endpoint(object.url);
        presentations.push({ id: pkAssetsTarget, category: category });
    }
    let data = {
        email: tokensendEmail,
        score: score,
        answer: answers,
        presentation: presentations,
        emotion: emotion,
        date: date,
        type: array[2].type,
        longTerm: array[2].longTerm
    }
    let games = await putUserGameItems(data);
    return games;
}

module.exports = { loadGameInfo }