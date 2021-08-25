import { useState } from 'react';
import axios from 'axios';
import '../Styles/verificationEmail.css';

// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const VerificationEmail = () => {
    const [email, setEmail] = useState('')
    const [afterButton, setAfterButton] = useState('')

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    var messageErrorPass = ''
    var messageOkPass = ''
    var placeholderEmail = ''
    if (localStorage.getItem('idioma') === 'en') messageErrorPass = 'Enter a valid email';
    if (localStorage.getItem('idioma') === 'es') messageErrorPass = 'Ingresá un email válido';
    if (localStorage.getItem('idioma') === 'es') messageOkPass = 'Te enviamos un correo de verificación';
    if (localStorage.getItem('idioma') === 'en') messageOkPass = 'We sent you a verification email';
    if (localStorage.getItem('idioma') === 'es') placeholderEmail = 'Correo electrónico';
    if (localStorage.getItem('idioma') === 'en') placeholderEmail = 'Email';

    const emailToBack = async () => {
        setAfterButton('')
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if (!emailReject.test(email)) {
            alert(messageErrorPass)
            return
        }
        let user = {
            email: email
        }
        let response = await axios.post(`${process.env.REACT_APP_API_URL}verificationchangepassword`, user)
        console.log(response)
        setAfterButton(messageOkPass)
    }

    return (
        <div className='forgotPassContainer'>
            <div className='subcontainer_forgotPass'>
                <label htmlFor='Email'> {<Translate content="olvidasteContrasena" component="span" />}</label>
                <input className='inputForgotPass' name='Email' placeholder={placeholderEmail} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={emailToBack}>{<Translate content="enviar" component="p" />}</button>
                <h3> {afterButton} </h3>
            </div>
        </div>
    )
};

export default VerificationEmail;