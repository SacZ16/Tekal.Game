import React, {useState} from 'react';
import axios from 'axios';
import '../Styles/verificationEmail.css';

// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const VerificationEmail = () => {
    const [email, setEmail] = useState ('')
    const [afterButton, setAfterButton] = useState('')

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    const emailToBack = async () => {
        setAfterButton('')
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if(!emailReject.test(email)) {
            alert('enter a valid email') 
            return
        }
        console.log('ASassasas')
        let user = {
            email: email
        }
        let response = await axios.post(`${process.env.REACT_APP_API_URL}verificationchangepassword`, user)
        console.log(response)
        setAfterButton('If the email is correct we will send a verification message')
    }

    return(
        <div className='forgotPassContainer'>
            <div className='subcontainer_forgotPass'>
            <label htmlFor='Email'> {<Translate content="olvidasteContrasena" component="span" />}</label>
            <input name='Email' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
            <button  onClick={emailToBack}>{<Translate content="enviar" component="span" />}</button>
            <h3> {afterButton} </h3>
            </div>
        </div>
    )
};

export default VerificationEmail;