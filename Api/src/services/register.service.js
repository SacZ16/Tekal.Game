const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {google}= require ('googleapis')
const {newUser,getallUsers,putUserLogin}= require ('../Controllers/dbFunctions.js')
const jwt = require ('jsonwebtoken')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const CLIENT_ID='234439557126-rs5svefaj89lrjr3pu0sg32vmelcpo8s.apps.googleusercontent.com'
const CLIENT_SECRET='uUVc9D-DGdZ_rfvJi85z3Fav'
// const CLIENT_REFRESH=''
const REDIRECT_URL='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN= '1//04G8sNP1Kdi8BCgYIARAAGAQSNwF-L9IrLxJch2GNJK71jwbM3cVwtjSfeMnwFLvwQCqUz0kaaOu0LpewZANwETtTjEKixm6LghQ'

const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);


const registerUser = async (datos) =>{
    try{
        const infoUser = `INFO#${datos.email}`;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(datos.password, salt);

        const Item= {
            "PK": datos.email,
            "SK": infoUser,
            "email":  datos.email,
            "password": password,
            "VerificationEmail": false,
        }
        const response = await putUserLogin(Item)
        return response;
    }catch(error){
        console.error(error);
        // manejenen el error como se les de la gana, pero manejenlo
    }
}


const sedEmail = async (email) =>{
    var tokensendEmail = jwt.sign({ email: email }, 'prueba');
    await oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

    const algo= await oAuth2Client.getAccessToken()
    console.log( algo.token)

    const transporter= nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAUTH2',
            user:'goyeliseo1@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refresh_token:REFRESH_TOKEN,
            accessToken: algo.token,
        }
    });

    await transporter.sendMail({
        from: 'Pagina Web NodeMailer <goyeliseo1@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello :heavy_check_mark:", // Subject line
        text: `http://localhost:3000/verificationemail?${tokensendEmail}`, // plain text body
});

}


module.exports = {registerUser,sedEmail}