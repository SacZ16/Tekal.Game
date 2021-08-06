import React, {useState} from 'react';
import axios from 'axios';
import Particles from 'react-particles-js'
import logoTekal from '../Styles/tekalLogo.png';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import '../Styles/registerForm.css';

const RegisterWithEmail = () => {
    const [email, setEmail] = useState('');
    const [ConfirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    //Estos van a estar seteando errores (osea cuando los inputs se rellenen mal estos estados van a tener algo adentro)

    const SendToBackEnd = (e) => {
        e.preventDefault()
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if (!emailReject.test(email) && email.length > 0){
            console.log('ENTREEE')
            return;
        }
        if(email !== ConfirmEmail){
            console.log('ENTREEE222222222222')
            return;
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(password) && password.length >= 0){
            console.log('ENTREEE2222')
            return;
        }
        if(password !== confirmPass){
            console.log('ENTasd')
            return;
        }
        const user = {
            email: email,
            password: password,
            test:email,
        }
        console.log(user)
        axios.post(`${process.env.REACT_APP_API_URL}register`, user) ///Eliseo PONE LA RUTA DE BACK ACA XD
}

    return(
        <>
        <div class='bgLanding'>
        <Particles
                params={{'particles':{"number":{"value":96,"density":{"enable":true,"value_area":800}}},'line_linked':{'width':'2'},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"}}}}}
            />
            </div>
            <img className='logoTekal' src={logoTekal} alt="Logo de Tekal"/>
            <div className='screenText'>
                <h1 className='check'>Check how your</h1>
                <div className='text2'>
                    <h1 className='memory'>memory&nbsp;</h1>
                    <h1 className='working'>is working</h1> 
                </div>
            <p className='loremLogin'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris.
            </p>
            </div>
            <p className='copyrightRegister'>© 2021 Tekal, Inc. All rights reserved</p>
            <form className='formRegister'>
            <img className='logoFormRegister' src={logoTekal} alt="Logo de Tekal"/>
                <input className='inputFormRegister' placeholder='Email' name='email' type='text' onChange={(e) => setEmail(e.target.value)}/>
                    {/* <p>Invalid Email format</p> */}
                <input className='inputFormRegister' placeholder='Confirm email' name='Cemail' type='text' onChange={(e) => setConfirmEmail(e.target.value)} />
                    {/* <p>Email must be the same</p> */}
                <input className='inputFormRegister' placeholder='Password' name='password' onChange={(e) => setPassword(e.target.value)} type='password' />
                {/*  <p>Minimum 8 characters</p>
                    <p>Maximum 15 characters</p>
                    <p>At least one capital number</p>
                    <p>At least one capital letter</p>
                    <p>At least one lower case letter</p>
                    <p>No blanks</p>
                    <p>At least 1 special character</p> */}
                <input className='inputFormRegister' placeholder='Confirm password' name='Cpassword' onChange={(e) => setConfirmPass(e.target.value)} type='password'/>
                    {/* <p>Passwords must be the same</p> */}
                <p className='orRegister'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
                <GoogleButton/>
                <FacebookButton/>
                <button className='buttonRegister' onClick={(e) => SendToBackEnd(e)}> Register </button>
            </form>
        </>
    )
}

export default RegisterWithEmail;