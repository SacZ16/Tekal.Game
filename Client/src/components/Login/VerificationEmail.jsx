import React, {useState} from 'react';
import axios from 'axios';

const VerificationEmail = () => {
    const [email, setEmail] = useState ('')
    const [afterButton, setAfterButton] = useState('')

    const emailToBack = () => {
        setAfterButton('')
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if(!emailReject.test(email)) {
            alert('enter a valid email') 
            return
        }
        console.log('ASassasas')
        let user = {
            email: email
        }
        // axios.post(`${process.env.REACT_APP_API_URL}`, user)
        setAfterButton('If the email is correct we will send a verification message')
    }

    return(
        <div>
            <label htmlFor='Email'> Don't you remember your password? </label>
            <input name='Email' placeholder='enter your email' onChange={(e) => setEmail(e.target.value)}/>
            <button  onClick={emailToBack}> Sumbit </button>
            <h3> {afterButton} </h3>
        </div>
    )
};

export default VerificationEmail;