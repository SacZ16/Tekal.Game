import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import {SendDataGoogle} from '../controllers/dbFunctions'


const FacebookButton = () => {
    const [profile, setProfile] = useState('')
    const responseFacebook = async (response) => {
        if(response.email){
            console.log(response)
            let obj = {
                email: response.email,
                name: response.name.split(' ')[0]
            }
            console.log(await SendDataGoogle(obj))
        }
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
                textButton='Continue with Facebook'
                />
        </div>
    );
}

export default FacebookButton;
