import React, { useState } from 'react';
import '../Styles/loginForm.css'
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import Cookie from 'universal-cookie'
import Swal from 'sweetalert2'

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
    
    return (
        <>
            <div className='containerLanding'>
                <div className='form'>
                    {err && <h5 style={{ color: 'red' }}>{err}</h5>}
                    <form className='form2'>
                        <input className='inputForm' type='text' placeholder='Email adress' onChange={(e) => setemail(e.target.value)} />
                        <input className='inputForm' type='password' placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
                    </form>
                    <div className='form3'>
                        <a className='forgotPassword' href='/forgotPassword'>Forgot password?</a>
                        <button className='continue' onClick={() => checker(email, password)}> Continue </button>
                        <p className='or'><hr className='hr' width='40%' color='lightgrey'></hr>OR<hr class='hr' width='40%' color='lightgrey'></hr></p>
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