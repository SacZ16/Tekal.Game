import React, { useState } from 'react';
import axios from 'axios';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'
import '../Styles/registerForm.css';
import Swal from 'sweetalert2'

const RegisterWithEmail = () => {
    const cookiies = new Cookie(); //no borrar - estilo css
    const [passwordcopia, setPasswordcopia] = useState('')
    const [err, setErr] = useState('')

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
    const alert = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
        })
    }

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
        if (localStorage.getItem('pruebaa')) {
            if (response.data.status) {
                alert()

                window.location.href = './preclose'
            }
            else { setErr('The email was already used') }

        }
        if (!localStorage.getItem('pruebaa')) {
            if (response.data.status) {
                alert()

                window.location.href = './'
            }
            else { setErr('The email was already used') }

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
            {err && <h5 style={{ color: 'red' }}>{err}</h5>}
            <div class="row" onChange={handleInputChange}>
                <div class="column" >
                    <p class="titles_register_form">Name</p>
                    <input class="swal2-inputmh4" name='name' />
                    <p class="titles_register_form">Date of birth</p>
                    <input class="swal2-inputmh4" type='date' name='date' />
                    <p class="titles_register_form">Country</p>
                    <input class="swal2-inputmh4" name='country' />
                    <p class="titles_register_form">Password</p>
                    <input id='pass' class="swal2-inputmh4" name='password' type='password' onChange={handleInputChange} />
                    <p class="titles_register_form">Gender</p>
                    <input class="swal2-inputmh4" name='genero' />
                    <GoogleButton />
                </div>
                <div class="column" >
                    <p class="titles_register_form">Last Name</p>
                    <input class="swal2-inputmh4" name='lastname' />
                    <p class="titles_register_form">Email</p>
                    <input id='email' class="swal2-inputmh4" name='email' onChange={handleInputChange} />
                    <p class="titles_register_form">City/State</p>
                    <input class="swal2-inputmh4" name='city' />
                    <p class="titles_register_form">Confirm Password</p>
                    <input id='confpass' class="swal2-inputmh4" name='confirmPass' type='password' onChange={handleInputChange} />
                    <p class="titles_register_form">Ethnicity</p>
                    <input class="swal2-inputmh4" name='ethnicity' />
                    <FacebookButton />
                </div>
            </div>
            <button className='buttonRegister' onClick={SendToBackEnd}> Register </button>

        </>
    )
}

export default RegisterWithEmail;