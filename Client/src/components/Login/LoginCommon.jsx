import React, {useState} from 'react';
import axios from 'axios';

const LoginCommon = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SendDataToBACK = async () => {
        const objPost = {
            email: email,
            password: password,
        }
        const status= await axios({
            url: 'http://localhost:3001/login',
            method: 'POST',
            data: objPost
        })
        console.log(status.data)
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        if(status.data.status==400){return alert('usuario o contraseña mal')}
        else if(status.data.status==200){return alert('te logueaste')}
    }

    return(
        <div>
            <form>
                <input type='text' id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input type='text' id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            </form>
            <button onClick={() => SendDataToBACK()}> ola soy un boton </button>
        </div>
    )
};

export default LoginCommon;