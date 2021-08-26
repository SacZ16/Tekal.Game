const { updateView, updateAnnotationsCorrect, putAssets, queryAllInfoUser } = require("../Controllers/dbFunctions");
const { endpointNoMemento, endpoint1 } = require("./endpoint.service");
const jwt = require ('jsonwebtoken');

async function loadEndpoints(array){
    let email = array[0];
    var tokensendEmail = jwt.sign({ email: email, iat:25 }, 'prueba');
    let urls = [];
    const userInfo = await queryAllInfoUser(tokensendEmail);
    let age = ''
    let country = ''
<<<<<<< HEAD
    var arrayAlgo=[];
=======
    let chunk = [];
>>>>>>> cfbdffcb30ae1f68ae14b3be18c3146ea5cccdf2
    if(userInfo.Items[0].age && userInfo.Items[0].country){
        age = userInfo.Items[0].age;
        country = userInfo.Items[0].country;
    }
    for (let i = 2; i < array.length; i++) {
        let mood = array[i].mood;
        var object = array[i];
        object.age = age;
        object.mood = mood;
        object.country = country;
        object.pos = i - 2;
        let pkAssetsTarget = object.type === "image"? endpointNoMemento(object.url) : endpoint1(object.url);
        object.url = pkAssetsTarget;
        if (array[i].category === "target"){
            updateView(pkAssetsTarget);
        }
        if (array[i].category === "target_repeat" && array[i].answer == 1){
            updateAnnotationsCorrect(pkAssetsTarget);
        }
        if (urls.includes(pkAssetsTarget)) {
            let index = urls.indexOf(pkAssetsTarget) + 1;
            object.repeated = true;
            object.pos_1st = object.pos - index;
            object.lag = object.pos - object.pos_1st;
        } else {
            urls.push(pkAssetsTarget);
            object.repeated = false;
        }
<<<<<<< HEAD
        arrayAlgo.push(putAssets(email, object));
    }
    await Promise.all(arrayAlgo)
=======
        chunk.push(putAssets(email, object));
    }
    await Promise.all(chunk);
>>>>>>> cfbdffcb30ae1f68ae14b3be18c3146ea5cccdf2
}

module.exports = { loadEndpoints }
