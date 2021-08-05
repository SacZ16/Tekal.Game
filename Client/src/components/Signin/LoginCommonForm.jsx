import React, {useState} from 'react';
import axios from 'axios';
import logoTekal from '../Styles/tekalLogo.png'
import { Link } from 'react-router-dom';
import '../Styles/register.css'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';


<<<<<<< HEAD:Client/src/components/Signin/RegisterCommonForm.jsx

const RegisterCommonForm = (props) => {
=======
const RegisterCommonForm = ({props}) => {
>>>>>>> 224e3e1bd8a6fd17bbbb535887e0d6487127db4e:Client/src/components/Signin/LoginCommonForm.jsx
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, seterrorPassword] = useState('');

    


    return(
        <>
            <div className='containerLanding'>
                <form className='form'>
                    <img className='logoForm' src={logoTekal} alt="Logo de Tekal"/>
                    <p className='welcome'>Welcome</p>
                    <p className='loginText'>Log in to TekalGame to play.</p>
                    <input className='inputForm' type='text'  placeholder='Email adress' onChange={(e) => setemail(e.target.value)}/>
                    <input className='inputForm' type='password'  placeholder='Password' onChange={(e) => setpassword(e.target.value)}/>
                    {/* <button className='continue' onClick= {()=>props(email, password)}> Continue </button> */}
                    <Link className='forgotPassword'to=''>Forgot password?</Link>
<<<<<<< HEAD:Client/src/components/Signin/RegisterCommonForm.jsx
                    <button className='continue' onClick={(e) => register(e)}> Continue </button>
                    <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr className='hr' width='40%' color='lightgrey'></hr></p>
=======
                    <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
>>>>>>> 224e3e1bd8a6fd17bbbb535887e0d6487127db4e:Client/src/components/Signin/LoginCommonForm.jsx
                </form>
                <button className='continue' onClick= {()=> props(email, password)}> Continue </button>
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
