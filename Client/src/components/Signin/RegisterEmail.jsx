import React, {useState} from 'react';
import logoTekalNegro from '../Styles/tekallogonegro.png'
import '../Styles/registerForm.css';

const RegisterWithEmail = () => {      

    return(
        <>
            <div className='formRegister'>
            <form className='formRegister2'>
            <img className='logoFormRegister' src={logoTekalNegro} alt="Logo de Tekal"/>
            <div>
                <input className='inputFormRegister' placeholder='Email' name='email' type='text' required/>
            </div>
            <input className='inputFormRegister' placeholder='Confirm email' name='confirmEmail' type='text' required/>
            <input className='inputFormRegister' placeholder='Password' name='password' type='password' required/>
            <input className='inputFormRegister' placeholder='Confirm password' name='confirmPass' type='password' required/>
            </form>
            <div className='formRegister2'>
            <button className='buttonRegister'> Register </button> 
            </div>
            </div>
        </>
    )
}

export default RegisterWithEmail;