import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import '../Styles/facebookButton.css'
import {SendDataGoogle} from '../controllers/dbFunctions'


const FacebookButton = () => {
    const [profile, setProfile] = useState('')
    const responseFacebook = (response) => {
        setProfile(response);
    }

    if(profile.email){
        SendDataGoogle(profile.email)
    }
    
    

    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_ID_FACE}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass='facebookBtn'
                textButton='Continue with Facebook'
                />
        </div>
    );
}

export default FacebookButton;
