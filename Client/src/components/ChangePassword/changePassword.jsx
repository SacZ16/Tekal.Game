import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import axios from 'axios'
import {SendDataGoogle} from '../controllers/dbFunctions'
import jwt, { decode } from 'jsonwebtoken'
import {useLocation} from "react-router-dom";
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


        return (
            <div>
                <label htmlFor='Password'>{<Translate content="contrasena" component="span" />}</label>
                <input name='Password' type='text' onChange={(e) => setpassword(e.target.value)} />
                <label  htmlFor='RepeatPassword'> {<Translate content="confirmaContrasena" component="span" />}</label>
                <input name='RepeatPassword' type='text' onChange={(e) => setconfirmpassword(e.target.value)}/>
                <button onClick={()=>{
                    if (!passwordReject.test(password) && password.length >= 0){
                        alert("Maximum 15 characters \n At least one capital number \n At least one capital letter \n At least one lower case letter \n No blanks")
                        return;
                    }
                    if(password !== confirmpassword){
                        return;
                    }
                    postNewPassword(obj.email, password)

                }}>{<Translate content="enviar" component="span" />}</button>
            </div>
        );
        
    } catch(err) {
        // err
        return (
            <h1>
                Error
            </h1>
        );
    }
}

export default ChangePassword;