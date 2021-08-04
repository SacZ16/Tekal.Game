import React from 'react';
import { GoogleLogin } from 'react-google-login';


const GoogleButton = () => {

    const responseGoogle = (response) => {
        console.log(response)
    }



    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_ID_GOOGLE}
                buttonText="Login"
                // render = {renderProps => (
                //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}> por si quieren darle su propio estilo XD</button>
                // )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default GoogleButton;
