import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import axios from 'axios'
import {SendDataGoogle} from '../controllers/dbFunctions'
import jwt, { decode } from 'jsonwebtoken'
import {useLocation} from "react-router-dom";
import '../Styles/passRecover.css';
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const ChangePassword = () => {
    const [response, setResponse] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')

    const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
       
    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    var token = useLocation().search.replace('?', '');
    try {
        let obj = jwt.verify(token, process.env.REACT_APP_SECRETWORD);
        async function postNewPassword(){
            var emailandPasswor={
                email:obj.email,
                password: password}
        await axios.post(`${process.env.REACT_APP_API_URL}changepassword`, emailandPasswor)
        window.location.href='./'
        }

        var avisoRecoverPass = '';
        if(localStorage.getItem('idioma')==='es') avisoRecoverPass = "Máximo 15 caracteres. \n Al menos un número. \n Al menos una mayúscula. \n Al menos una minúscula. \n Sin espacios en blanco."
        if(localStorage.getItem('idioma')==='en') avisoRecoverPass = "Maximum 15 characters. \n At least one number. \n At least one capital letter. \n At least one lower case letter. \n No blanks."

        return (
            <div className='containerSuperPassRecover'>
            <div className='containerPassRecover'>
                <label htmlFor='Password'>{<Translate content="contrasena" component="span" />}</label>
                <input name='Password' type='text' onChange={(e) => setpassword(e.target.value)} />
                <label  htmlFor='RepeatPassword'> {<Translate content="confirmaContrasena" component="span" />}</label>
                <input name='RepeatPassword' type='text' onChange={(e) => setconfirmpassword(e.target.value)}/>
                <button onClick={()=>{
                    if (!passwordReject.test(password) && password.length >= 0){
                        alert(avisoRecoverPass)
                        return;
                    }
                    if(password !== confirmpassword){
                        return;
                    }
                    postNewPassword(obj.email, password)

                }}>{<Translate content="enviar" component="span" />}</button>
            </div>
            </div>
        );
        
    } catch(err) {
        // err
        return (
            <div className='containerErrorRecover'>
            <h1>
                Error 404
            </h1>
            </div>
        );
    }
}

export default ChangePassword;