import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import {SendDataGoogle} from '../controllers/dbFunctions'
import jwt, { decode } from 'jsonwebtoken'
import {
    useLocation
} from "react-router-dom";

const Verification = () => {
    var token = useLocation().search.replace('?', '');
    try {
        jwt.verify(token, process.env.REACT_APP_SECRETWORD);
        return (
            <h1>
                Verificado
            </h1>
        );
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