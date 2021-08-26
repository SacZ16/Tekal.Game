require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {google}= require ('googleapis')
const {newUser,getallUsers,putUserLogin,queryAllInfoUser,updateEmailVerification }= require ('../Controllers/dbFunctions.js')
const jwt = require ('jsonwebtoken')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const {
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URL,REFRESH_TOKEN , EMAIL_TEKAL
} = process.env;

const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);


const registerUser = async (datos) =>{
    var email= datos.email
    var tokensendEmail = jwt.sign({ email: email, iat:25 }, 'prueba');
    try{
        const infoUser = `INFO#${tokensendEmail}`;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(datos.password, salt);

        const Item= {
            "PK": tokensendEmail,
            "SK": infoUser,
            "email":  tokensendEmail,
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
            user:'memorygame@tekal.ai',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refresh_token:REFRESH_TOKEN,
            accessToken: algo.token,
        }
    });

    await transporter.sendMail({
        from: 'Pagina Web NodeMailer <memorygame@tekal.ai>', // sender address
        to: email, // list of receivers
        subject: "Hello :heavy_check_mark:", // Subject line
        text: `http://localhost:3000/verificationemail?${tokensendEmail}`, // plain text body
});

}
const sendEmailForPassword = async (email) =>{
    var tokensendEmail = jwt.sign({ email: email }, 'prueba');
    await oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

    const algo= await oAuth2Client.getAccessToken()
    console.log( algo.token)

    const transporter= nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAUTH2',
            user:'memorygame@tekal.ai',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refresh_token:REFRESH_TOKEN,
            accessToken: algo.token,
        }
    });

    await transporter.sendMail({
        from: 'Pagina Web NodeMailer <memorygame@tekal.ai>', // sender address
        to: email, // list of receivers
        subject: "Hello :heavy_check_mark:", // Subject line
        text: `http://localhost:3000/passwordchange?${tokensendEmail}`, // plain text body
});
}

const verificationEmail = async (email) => {
    let infoUser = await queryAllInfoUser(email);
    console.log(infoUser)
    if(infoUser.Items.length){
        if(!infoUser.Items[0].VerificationEmail){
            await updateEmailVerification(email)
            return ('Ok');
        } else {
            return ('Email already verified')
        }
    } else {
        return ('Error')
    } 
    
}




module.exports = {registerUser,sedEmail,verificationEmail,sendEmailForPassword}