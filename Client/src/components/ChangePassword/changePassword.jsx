import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../Styles/facebookButton.css'
import axios from 'axios'
import {SendDataGoogle} from '../controllers/dbFunctions'
import jwt, { decode } from 'jsonwebtoken'
import {
    useLocation
} from "react-router-dom";





const changePassword = () => {
    const [response, setResponse] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')


    var token = useLocation().search.replace('?', '');
    try {
        let obj = jwt.verify(token, process.env.REACT_APP_SECRETWORD);
        return (
            <div>
                <label htmlFor='Password'> Password </label>
                <input name='Password' type='text' onChange={(e) => setpassword(e.target.value)} />
                <label  htmlFor='RepeatPassword'> Repeat Password </label>
                <input name='RepeatPassword' type='text' onChange={(e) => setconfirmpassword(e.target.value)}/>
            </div>
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

export default changePassword;