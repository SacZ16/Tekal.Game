import { useState } from 'react';
import '../Styles/facebookButton.css'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useLocation } from "react-router-dom";
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const Verification = () => {

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    const [response, setResponse] = useState('')
    const postEmailVerification = async (obj) => {
        let responseBack = await axios.post(`${process.env.REACT_APP_API_URL}verification`, obj)
        setResponse(responseBack)
        console.log(response)
        return responseBack
    }
    var token = useLocation().search.replace('?', '');
    try {
        let obj = jwt.verify(token, process.env.REACT_APP_SECRETWORD);
        if (!response) {
            let res = postEmailVerification(obj)
            return (
                <h1>
                    {<Translate content="verificando" component="span" />}
                </h1>
            );
        }
        console.log(response)
        if (response.data === 'Ok') {
            return (
                <h1>
                    {<Translate content="verifcado" component="span" />}
                </h1>
            );
        } else if (response.data === 'This email is not registered') {
            return (
                <h1>
                    {<Translate content="emailNoRegistrado" component="span" />}
                </h1>
            );
        } else if (response.data === 'Email already verified') {
            return (
                <h1>
                    {<Translate content="emailVerificado" component="span" />}
                </h1>
            );
        } else {
            return (
                <h1>
                    Ups!
                </h1>
            );
        }

    } catch (err) {
        // err
        return (
            <div className='containerErrorRecover'>
                <h1>
                    Error
                </h1>
            </div>
        );
    }
}

export default Verification;