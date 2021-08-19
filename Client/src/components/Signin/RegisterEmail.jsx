import React, { useState } from 'react';
import axios from 'axios';
import Particles from 'react-particles-js'
import logoTekal from '../Styles/tekalLogo.png';
import logoTekalNegro from '../Styles/tekallogonegro.png'
import logoTekalAzul from '../Styles/tekallogoazul.png'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'
import '../Styles/registerForm.css';
const RegisterWithEmail = () => {
    const cookiies = new Cookie(); //no borrar - estilo css
    const [passwordcopia, setPasswordcopia] = useState('')    
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPass: "",
    })

    //Estos van a estar seteando errores (osea cuando los inputs se rellenen mal estos estados van a tener algo adentro)
    /* const [errorEmail, setErrorEmail] = useState('');
    const [errorConfirmEmail, setErrorConfirmEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPass, setErrorConfirmPass] = useState(''); */


    const SendToBackEnd = async (e) => {
        e.preventDefault()
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if (!emailReject.test(input.email) && input.email.length > 0) {
            return;
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(input.password) && input.password.length >= 0) {
            return;
        }
        if (input.password !== input.confirmPass) {
            return;
        }
        const user = {
            email: input.email,
            password: input.password,
            test: input.email,
        }
        console.log(user)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}register`, user) ///Eliseo PONE LA RUTA DE BACK ACA XD
        if(localStorage.getItem('pruebaa')){
            if (response.data.status) {
                alert('Usuario Registrado con Exito')
                
                window.location.href='./preclose'
            }
            else { alert('ESE MAIL YA ES EN USO') }
        }
         if(!localStorage.getItem('pruebaa')){
                if (response.data.status) {
                    alert('Usuario Registrado con Exito')
                    
                    window.location.href = './'
                }
                else { alert('ESE MAIL YA ES EN USO') }
        }
    }

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })        
    } 
    var a = cookiies.get('prueba')
    return (
        <>      
         <div class="row" onChange={handleInputChange}>
                     <div class="column" >
                             <p class="dddd">Name</p>
                             <input class="swal2-inputmh4" name='name'/>
                             <p class="dddd">Date of bith</p>
                             <input class="swal2-inputmh4" type='date' name='date' />
                             <p class="dddd">Country</p>
                             <input class="swal2-inputmh4" name='country'/>
                             <p class="dddd">Password</p>
                             <input  id='pass' class="swal2-inputmh4" name='password' type='password' onChange={handleInputChange} />
                             <p class="dddd">Genero</p>
                             <input class="swal2-inputmh4" name='genero'/>
                             <GoogleButton />                        
                     </div>
                     <div class="column" >
                             <p class="dddd">Last Name</p>
                             <input class="swal2-inputmh4" name='lastname' />
                             <p class="dddd">Email</p>
                             <input  id='email' class="swal2-inputmh4" name='email' onChange={handleInputChange}/>
                             <p class="dddd">City/state</p>
                             <input class="swal2-inputmh4" name='city'/>
                             <p class="dddd">Confirm Password</p>
                             <input  id='confpass' class="swal2-inputmh4" name='confirmPass' type='password' onChange={handleInputChange} />
                             <p class="dddd">Ethnicity</p>
                             <input class="swal2-inputmh4" name='ethnicity'/>
                             <FacebookButton />
                     </div>
                 </div>
                 <button className='buttonRegister' onClick={SendToBackEnd}> Register </button>
            
        </>
    )
}

export default RegisterWithEmail;