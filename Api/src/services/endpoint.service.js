
function endpoint(url){   // data memento
    let string2 = url.slice(72);
    console.log("AAA")
    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
            console.log(asset)
        }
        else {
            return asset.slice(29);
        }
    }
}

function endpointNoMemento(url){ 
    let string2 = url.slice(78);
    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
        }else{
            return asset;
        }
    
        
    }

}
        
//endpointNoMemento("https://tekal-dashboard-asset-input.s3.amazonaws.com/memory-game-active/image/twinings_ig_img_5.jpg?AWSAccessKeyId=ASIA27M5RUA5FAYZFGUG&Signature=%2FjjbwItZgjV5jenRn6SxlM71RMk%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIHRKamMdubSEIjBy7PE69f%2BR7i4E1BnK%2Fj0rMzOa8dDOAiBo%2F%2FYgmVXOMfjRupxIOwSIHUGNdGTlNeHAP%2BKuKH737SqmAgj3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDc1NDYzNDAzOTM1NCIMDKko4EdwpBltyCraKvoBFvRdigB2V11lRKnIIi469H%2B4ylXuSELPapVf0vWMggTKHfMl%2B2qYLtaPXqYUAb37trAzE%2F7a3ATZX1tkK3wTHQT8G9rDZ7MyYDBPHHxI6u26QRz060SbUuI4zU%2FI8VhxC2LuP5GrPEGiGs92kzZDaYYoOBXe1G66SRX00mD30Q%2Bu9CkaQ9hzCpgWJ4HSBInYxyspeAZulUA6raRvsoAqe6iZjjplj3kyLPKSrWCHNgWdWtc%2FqAW9psMy0Qx8ca2l3ibBe76wapSshWGs%2BP1zH%2FUbMyl1OjOmE5vpzWIDCNT1FVk6fEcZ7Gck8BUJ4IrEJwN2INIjn6uhvTCmlouJBjqbAajkpryec%2FHk3pmm1qh09iDBzaGjSp8y46CghbSvTmhEwzrPbU%2FYCuX4ajX1Yo%2Bjaqc%2BaUD1dAjhncCms1iZ1yh9ie%2FcSQqWEqnroscFSCKxbV5HnoBHXn2zwMytg9znlTy6dbO9ank0pBG8K7nqdxFQyzHYdlmNGnS8WCSOsoFogLEuyqnnvmW%2Be8xB6wEyqmAh6WSb8gnvBCdc&Expires=1629673840")


module.exports = {endpoint, endpointNoMemento};