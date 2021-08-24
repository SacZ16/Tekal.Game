import React from 'react';
import { GoogleLogin } from 'react-google-login';
import '../Styles/googleButton.css';
import { SendDataGoogle } from '../controllers/dbFunctions'
const GoogleButton = () => {

    const responseGoogle = (response) => {
        let obj = {
            email: response.profileObj.email,
            name: response.profileObj.givenName
        }
        SendDataGoogle(obj)
    }
    
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_ID_GOOGLE}
                buttonText="Continue with Google"
                render={renderProps => (
                    <button style={{ 'border': '1px solid #1663A2' }} className='googleLogin' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Continue with Google
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
