import React, { useState } from 'react';
import '../Styles/loginForm.css'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'
import Swal from 'sweetalert2'

//Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const RegisterCommonForm = ({ props, coloresprop }) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [err, setErr] = useState('')

    const cookiies = new Cookie(); //no borrar
    var a = cookiies.get('prueba')

    const checker = async (email, password) => {
        if (!email || !password) setErr('Complete all fields')
        const checker2 = await props(email, password)
        checker2 && setErr(checker2)
        if (!checker2) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            })
            Toast.fire({
                icon: 'success',
                title: 'Login in successfully'
            })
        }
    }

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */
    return (
        <>
            <div className='containerLanding'>
                <div className='form'>
                    {err && <h5 style={{ color: 'red' }}>{err}</h5>}
                    <form className='form2'>
                        <p>{<Translate content="mail" component="span" />}</p>
                        <input className='inputForm' type='text' onChange={(e) => setemail(e.target.value)} />
                        <p>{<Translate content="contrasena" component="span" />}</p>
                        <input className='inputForm' type='password' onChange={(e) => setpassword(e.target.value)} />
                    </form>
                    <div className='form3'>
                        <a className='forgotPassword' href='/forgotPassword'><p>{<Translate content="olvidasteContrasena" component="a" />}</p></a>
                        <button className='continue' onClick={() => checker(email, password)}> {<Translate content="continuar" component="span" />} </button>
                        <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>{<Translate content="o" component="span" />}<hr class='hr' width='40%' color='lightgrey'></hr></p>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <GoogleButton />
                            <FacebookButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default RegisterCommonForm;