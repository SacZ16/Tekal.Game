import React, {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import '../Styles/googleButton.css';
import { SendDataGoogle } from '../controllers/dbFunctions'

//Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"


const GoogleButton = () => {

    const responseGoogle = (response) => {
        console.log(response)
        let obj = {
            email: response.profileObj.email,
            name: response.profileObj.givenName,
            lastname:response.profileObj.familyName
        }
         SendDataGoogle(obj)
    }

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */
    
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_ID_GOOGLE}
                buttonText="Continue with Google"
                render={renderProps => (
                    <button className='googleLogin' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        {<Translate content="continuaGoogle" component="span" />}
                    </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default GoogleButton;