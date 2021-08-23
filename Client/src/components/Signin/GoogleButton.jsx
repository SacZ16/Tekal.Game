import React from 'react';
import { GoogleLogin } from 'react-google-login';
import '../Styles/googleButton.css';
import {SendDataGoogle} from '../controllers/dbFunctions'
const GoogleButton = () => {
    
    const responseGoogle = (response) => {
<<<<<<< HEAD
        console.log(response)
        // SendDataGoogle(response.profileObj.email)
=======
        let obj = {
            email: response.profileObj.email,
            name: response.profileObj.givenName
        }
        SendDataGoogle(obj)
>>>>>>> eca50a27b059119c115f285bf7c6c6888e75e811
    }
    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_ID_GOOGLE}
                buttonText="Continue with Google"
                render = {renderProps => (
                    <button style={{'border':'1px solid #1663A2'}} className='googleLogin' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <p className='one'>Con</p>
                    <p className='two'>tin</p>
                    <p className='three'>ue w</p>
                    <p className='four'>ith</p> 
                    <p className='five'>&nbsp;Goo</p>
                    <p className='six'>gle</p> 
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
