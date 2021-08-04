import React, {useState} from 'react';
import axios from 'axios';
import hash from 'object-hash';

const RegisterCommonForm = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, seterrorPassword] = useState('');

    const register = () => {
        // const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // if (!emailReject.test(email) && email.length > 0){
        //     setErrorEmail('Minimum 8 characters');
        //     return;
        // }
        // const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        // if (!passwordReject.test(password) && password.length > 0){
        //     seterrorPassword(`Minimum 8 characters\nMaximum 15 characters\nAt least one capital letter\nAt least one minute letter\nAt least one digit\nNo blanks\n At least 1 special character`);
        //     return;
        // }
        const user={
        email,
        password,
        test:email
        }
        axios.post('http://localhost:3001/register',user)
    }



    return(
        <div>
            <form>
            <input name="email" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)} /><p>{errorEmail}</p><br></br>
            <input type='password' name="password" value={password} placeholder="password" onChange={(e) => setpassword(e.target.value)} /><>{errorPassword}</><br></br>
            </form>
            <button  onClick={register}> 😁 </button>
        </div>
    )
}



export default RegisterCommonForm;
