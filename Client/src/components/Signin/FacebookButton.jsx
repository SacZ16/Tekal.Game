import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import { SendDataGoogle } from '../controllers/dbFunctions'
import FacebookIcon from '@material-ui/icons/Facebook';


const FacebookButton = () => {
    const [profile, setProfile] = useState('')
    const responseFacebook = (response) => {
        setProfile(response)
    }

    if (profile.email) {
        
        var profileNameTotal=profile.name.split(' ')
        let obj = {
            email: profile.email,
            name: profileNameTotal[0],
            lastname:profileNameTotal[(profileNameTotal.length)-1]
        }
        
        SendDataGoogle(obj)
    }
    if (localStorage.getItem('idioma') === 'es') {
        var continua = 'Continúa con Facebook'
    }

    if (localStorage.getItem('idioma') === 'en') {
        var continua = 'Continue with Facebook'
    }

    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_ID_FACE}
                autoLoad={false}
                fields="name,email,picture"
                // onClick={responseFacebook}
                callback={responseFacebook}
                cssClass='facebookBtn'
                textButton={continua}
            />
        </div>
    );
}

export default FacebookButton;