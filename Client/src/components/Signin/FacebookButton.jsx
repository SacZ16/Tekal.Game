import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import '../Styles/facebookButton.css'



const FacebookButton = () => {
    const [profile, setProfile] = useState('')

    
    const responseFacebook = (response) => {
        setProfile(response);
    }
    
    const postAndVerification = async (profile) => {
        const data = {
            email: profile.email,
            test: profile.email
        }
        await axios.post('http://localhost:3001/register', data)
    }

    if(profile.email){
        postAndVerification(profile)
    }
    
    

    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_ID_FACE}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass='facebookBtn'
                textButton='Continue with Facebook'
                />
        </div>
    );
}

export default FacebookButton;
