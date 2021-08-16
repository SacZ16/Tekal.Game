import React, {useState} from 'react';
import axios from 'axios';
import logoTekal from '../Styles/tekalLogo.png'
import logoTekalNegro from '../Styles/tekallogonegro.png'
import logoTekalAzul from '../Styles/tekallogoazul.png'
import { Link } from 'react-router-dom';
import '../Styles/loginForm.css'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'


const RegisterCommonForm = ({props,coloresprop}) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, seterrorPassword] = useState('');
    const cookiies= new Cookie(); //no borrar
    var a = cookiies.get('prueba')


    
    return(
        <>
            <div style={!a?{'background':`rgba(0, 0, 0, 0.904)`,'transition': 'all 0.5s ease-out'}:{'background':`${cookiies.get('fondoform')}`,'transition': 'all 0.5s ease-out'}} className='containerLanding'>
                <div className='form'>

                <form className='form2'>
                    {cookiies.get('fondo')==='black'||!a? <img className='logoForm' src={logoTekal} alt="Logo de Tekal"/>:<img className='logoForm' src={logoTekalNegro} alt="Logo de Tekal"/>}
                    <p style={{'color': `#A9A8A8`,'transition': 'all 0.5s ease-out'}} className='welcome'>Welcome</p>
                    <p style={{'color': `#A9A8A8`,'transition': 'all 0.5s ease-out'}} className='loginText'>Log in to TekalGame to play.</p>
                    {cookiies.get('fondo')==='black'||!a? <input  className='inputForm' type='text'  placeholder='Email adress' onChange={(e) => setemail(e.target.value)}/>:<input  className='inputForm2' type='text'  placeholder='Email adress' onChange={(e) => setemail(e.target.value)}/>}
                    {cookiies.get('fondo')==='black'||!a? <input className='inputForm' type='password'  placeholder='Password' onChange={(e) => setpassword(e.target.value)}/>:<input className='inputForm2' type='password'  placeholder='Password' onChange={(e) => setpassword(e.target.value)}/>}
                    {/* <button className='continue' onClick= {()=>props(email, password)}> Continue </button> */}
                </form>
                <div className='form3'>

                    <Link className='forgotPassword'to=''>Forgot password?</Link>
                    <button style={{'border':'1px solid #1663A2'}} className='continue' onClick= {()=> props(email, password)}> Continue </button>
                    <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
                <GoogleButton/>
                <FacebookButton/>
                <div className='signUp'>
                    <p style={{'color': `#A9A8A8`,'transition': 'all 0.5s ease-out'}} className='signUpText'>Don´t have an account?</p>
                    <Link className='signUpLink' to='/register'>Sign up</Link>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}



export default RegisterCommonForm;
