import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import axios from 'axios'
import {SendDataGoogle} from '../controllers/dbFunctions'
import jwt, { decode } from 'jsonwebtoken'
import {
    useLocation
} from "react-router-dom";




const Verification = () => {
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
        if(!response){
            let res = postEmailVerification(obj)
            return (
                <h1>
                    Verificando...
                </h1>
                );
        }
        console.log(response)
        if(response.data === 'Ok') {
            return (
            <h1>
                Verificado
            </h1>
            );
        } else if(response.data === 'This email is not registered') {
            return (
                <h1>
                    This email is not registered
                </h1>
                );
        } else if(response.data === 'Email already verified'){
            return (
                <h1>
                    Email already verified
                </h1>
                );
        } else {
            return (
                <h1>
                    Ups!
                </h1>
                );
        }

    } catch(err) {
        // err
        return (
            <h1>
                Error
            </h1>
        );
    }
}

export default Verification;