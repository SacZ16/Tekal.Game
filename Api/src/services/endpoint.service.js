
function endpoint(url){   
    let string2 = url.slice(72);

    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
        }
        else {
            return asset;
        }
    }
}

module.exports = {endpoint};