import React, {useState} from 'react';
import axios from 'axios';
import logoTekal from '../Styles/tekalLogo.png'
import logoTekalNegro from '../Styles/tekallogonegro.png'
import { Link } from 'react-router-dom';
import '../Styles/loginForm.css'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'
import VerificationEmail from '../Login/VerificationEmail';


const RegisterCommonForm = ({props,coloresprop}) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, seterrorPassword] = useState('');
    const cookiies= new Cookie(); //no borrar
    var a = cookiies.get('prueba')



    return(
        <>
            <div style={{background:'#242224', borderRadius:'10px'}} className='containerLanding'>
                <div className='form'>

                <form className='form2'>
                    <img className='logoForm' src={logoTekal} alt="Logo de Tekal"/>
                    <p style={{'color': `#dddcdc`,'transition': 'all 0.5s ease-out'}} className='welcome'>Login</p>
                    <input  className='inputForm' type='text'  placeholder='Email adress' onChange={(e) => setemail(e.target.value)}/>
                    <input className='inputForm' type='password'  placeholder='Password' onChange={(e) => setpassword(e.target.value)}/>
                </form>
                    <Link to='/forgotPassword' className='forgotPassword' >Forgot password?</Link>
                    <button className='continue' onClick= {()=> props(email, password)}> Continue </button>
                    <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
                <GoogleButton/>
                <FacebookButton/>
                <div className='signUp'>
                    <p style={{'color': `rgb(197, 197, 197)`}} className='signUpText'>Don´t have an account?</p>
                    <Link className='signUpLink' to='/register'>Sign up</Link>
                </div>
                
                </div>
            </div>
        </>
    )
}



export default RegisterCommonForm;
