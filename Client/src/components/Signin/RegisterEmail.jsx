
import React, { useState } from 'react';
import axios from 'axios';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'
import '../Styles/registerForm.css';
import Swal from 'sweetalert2'

import getCity from '../geoLocalitation/geoLocalitation'
import { newCookie } from '../controllers/dbFunctions';

//Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"
import Loading from '../Loading/Loading';

const RegisterWithEmail = ({ setRes }) => {
    const cookiies = new Cookie(); //no borrar - estilo css
    const [passwordcopia, setPasswordcopia] = useState('')
    const [countrytext, setcountrytext] = useState('')
    const [citytext, setscitytext] = useState('')
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPass: "",
        name: "",
        lastname: "",
        country: "",
        age: "",
        city: "",
        gender: "",
        ethnicity: "",
    })

    const country = getCity()

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
        // setLoading(true)
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if (!emailReject.test(input.email) && input.email.length > 0) {
            setErr('Verify all fields')
            return
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(input.password) && input.password.length >= 0) {
            setErr('Verify all fields')
            return
        }
        if (input.password !== input.confirmPass) {
            setErr('Verify all fields')
            return
        }
        if (!input.gender.length) {
            setErr('Verify all fields')
            return
        }
        if (!input.age.length) {
            setErr('Verify all fields')
            return
        }
        const user = {
            email: input.email,
            password: input.password,
            test: input.email,
            name: input.name,
            lastname: input.lastname,
            country: countrytext,
            age: input.age,
            city: citytext,
            gender: input.gender,
            ethnicity: input.ethnicity,
        }
        const response = await axios.post(`${process.env.REACT_APP_API_URL}register`, user) ///Eliseo PONE LA RUTA DE BACK ACA XD

        if (localStorage.getItem('pruebaa')) {
            if (response.data.status) {
                setLoading(false)
                alert()
                window.location.href = './preclose'
            }
            else {
                setErr('The email was already used')
            }
        }

        if (!localStorage.getItem('pruebaa')) {
            if (response.data.status) {
                setLoading(false)
                alert()
                user.password = ''
                newCookie([user])
                window.location.href = './'
            }
            else {
                setErr('The email was already used')
            }
        }
    }

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    var a = cookiies.get('prueba')

    const LoadingForm = () => {
        return (
            <img alt='Loading...' style={{ height: '80px', width: '80px' }} src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
        )
    }


    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    var preferNotToSay = ''
    var male = ''
    var female = ''
    var nonBinary = ''
    var white = ''
    var africanAmerican = ''
    var nativeAmerican = ''
    var pacificIslander = ''
    var asian = ''
    var nativeHawaiian = ''
    var latino = ''

    if (localStorage.getItem('idioma') === 'en') {
        var idioma = true
    }
    if (localStorage.getItem('idioma') === 'es') {
        idioma = false
    }

    if (idioma) {
        preferNotToSay = 'Prefer not to say'
        male = 'Male'
        female = 'Female'
        nonBinary = 'Non binary'
        white = 'White'
        africanAmerican = 'African American'
        nativeAmerican = 'Native American/Alaskan Native'
        pacificIslander = 'Pacific Islander'
        asian = 'Asian'
        nativeHawaiian = 'Native Hawaiian'
        latino = 'Latino or Hispanic'

    }

    if (!idioma) {
        preferNotToSay = 'Prefiero no decir'
        male = 'Masculino'
        female = 'Femenino'
        nonBinary = 'No binario'
        white = 'Blanco'
        africanAmerican = 'Afro Americano'
        nativeAmerican = 'Americano nativo / Alaskeño Nativo'
        pacificIslander = 'Nativo Islas del Pacífico '
        asian = 'Asiático'
        nativeHawaiian = 'Hawaiiano nativo'
        latino = 'Latino o Hispano'
    }

    return (
        <>
            {!loading ? null : <div style={{ position: 'absolute', width: '100%', left: '43%', top: '40%' }}><LoadingForm /></div>}
            {err && <h5 style={{ color: 'yellow', position: 'absolute', zIndex: '1000', top: '9em', left: '42%' }}>{err}</h5>}
            <div class="row" onChange={handleInputChange}>
                <div class="column" >
                    <p class="dddd">{<Translate content="nombre" component="span" />}*</p>
                    <input class="swal2-inputmh4" name='name' onChange={handleInputChange} />
                    <p class="dddd">{<Translate content="nacimiento" component="span" />}*</p>
                    <input class="swal2-inputmh4" type='date' name='age' onChange={handleInputChange} />
                    <p class="dddd">{<Translate content="pais" component="span" />}</p>
                    <input className="swal2-inputmh4" value={country.city ? country.country : countrytext} name='city' onChange={(e) => setcountrytext(e.target.value)} />
                    <p class="dddd">{<Translate content="contrasena" component="span" />}*</p>
                    <input id='pass' class="swal2-inputmh4" name='password' type='password' onChange={handleInputChange} />
                    <p class="dddd">{<Translate content="genero" component="span" />}*</p>
                    <select class="swal2-inputmh4" name='gender' onChange={handleInputChange}>
                        <option value='' hidden selected>{''}</option>
                        <option value='prefer-not-to-answer'>{preferNotToSay}</option>
                        <option value='male'>{male}</option>
                        <option value='female'>{female}</option>
                        <option value='non-binary'>{nonBinary}</option>
                    </select>
                </div>
                <div class="column" >
                    <p class="dddd" >{<Translate content="apellido" component="span" />}*</p>
                    <input class="swal2-inputmh4" name='lastname' onChange={handleInputChange} />
                    <p className="dddd">{<Translate content="mail" component="span" />}*</p>
                    <input id='email' class="swal2-inputmh4" name='email' onChange={handleInputChange} />
                    <p className="dddd">{<Translate content="ciudad" component="span" />}</p>
                    <input className="swal2-inputmh4" value={country.city ? country.city : citytext} name='city' onChange={(e) => setscitytext(e.target.value)} />
                    <p className="dddd">{<Translate content="confirmaContrasena" component="span" />}*</p>
                    <input id='confpass' class="swal2-inputmh4" name='confirmPass' type='password' onChange={handleInputChange} />
                    <p class="dddd">{<Translate content="etnia" component="span" />}</p>
                    <select class="swal2-inputmh4" name='ethnicity' onChange={handleInputChange}>
                        <option value='' hidden selected>{''}</option>
                        <option value='white'>{white}</option>
                        <option value='african-american'>{africanAmerican}</option>
                        <option value='native-american'>{nativeAmerican}</option>
                        <option value='pacific-islander'>{pacificIslander}</option>
                        <option value='asian'>{asian}</option>
                        <option value='native-hawaiian'>{nativeHawaiian}</option>
                        <option value='hipanic-latino'>{latino}</option>
                    </select>
                </div>
            </div>
            <button className='buttonRegister' onClick={SendToBackEnd}> {<Translate content="botonRegistro" component="span" />} </button>
            <div className='container_buttons_register_form'>
                <GoogleButton />
                <FacebookButton />
            </div>
        </>
    )
}

export default RegisterWithEmail;