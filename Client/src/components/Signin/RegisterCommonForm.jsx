import React, {useState} from 'react';
import axios from 'axios';
import logoTekal from '../Styles/tekalLogo.png'
import { Link } from 'react-router-dom';
import '../Styles/register.css'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';



const RegisterCommonForm = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, seterrorPassword] = useState('');

    const register = () => {
        const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailReject.test(email) && email.length > 0){
            setErrorEmail('Minimum 8 characters');
            return;
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(password) && password.length > 0){
            seterrorPassword(`Minimum 8 characters\nMaximum 15 characters\nAt least one capital letter\nAt least one minute letter\nAt least one digit\nNo blanks\n At least 1 special character`);
            return;
        }

        const user={
        email,
        password,
        test:email
        }
        axios.post('http://localhost:3001/register',user)
    }



    return(
        <>
            <div className='containerLanding'>
                <form className='form'>
                    <img className='logoForm' src={logoTekal} alt="Logo de Tekal"/>
                    <p className='welcome'>Welcome</p>
                    <p className='loginText'>Log in to TekalGame to play.</p>
                    <input className='inputForm' type='text'  placeholder='Email adress'/>
                    <input className='inputForm' type='password'  placeholder='Password'/>
                    <Link className='forgotPassword'to=''>Forgot password?</Link>
                    <button className='continue'> Continue </button>
                    <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
                </form>
                <GoogleButton/>
                <FacebookButton/>
                <div className='signUp'>
                    <p className='signUpText'>Don´t have an account?</p>
                    <Link className='signUpLink' to='/register'>Sign up</Link>
                </div>
            </div>
        </>
    )
}



export default RegisterCommonForm;
