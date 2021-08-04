import React from 'react';
import FacebookLogin from 'react-facebook-login';


const FacebookButton = () => {
    const responseFacebook = (response) => {
        console.log(response)
    }
    

    return (
    <div>
        <FacebookLogin
            appId={process.env.REACT_APP_ID_FACE}
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            //cssClass='NOMBRE QUE QUIERAN' por si quieren darle un estilo propio le asignan una clase y le dan el diseño 
            />
    </div>
    );
}

export default FacebookButton;
