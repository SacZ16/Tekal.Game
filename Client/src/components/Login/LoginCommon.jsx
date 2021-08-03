import React, {useState} from 'react';
import axios from 'axios';

const LoginCommon = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SendDateToBACK = async (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
        let objPost = {
            email: email,
            password: password,
        }

        let response = await axios({
            url: '',
            method: 'POST',
            data: objPost
        })
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
    }

    return(
        <div>
            <form>
                <input type='text' id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input type='text' id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={(e) => SendDateToBACK(e)}>  </button>
            </form>
        </div>
    )
};

export default LoginCommon;