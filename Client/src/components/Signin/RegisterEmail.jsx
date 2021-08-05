import React, {useState} from 'react';
import axios from 'axios';



const RegisterWithEmail = () => {
    const [email, setemail] = useState('');
    const [ConfirmEmail, setConfirmEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');


    //Estos van a estar seteando errores (osea cuando los inputs se rellenen mal estos estados van a tener algo adentro)
    const [errorEmail, setErrorEmail] = useState('');
    const [errorConfirmEmail, setErrorConfirmEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPass, setErrorConfirmPass] = useState('');


    const SendToBackEnd = () => {
        //Esta funcion arranca cuando le dan al boton de registrarse 😎 limplia los estados de errores, y se vuelve a fijar si hay error en los inputs
        setErrorEmail('')
        setErrorConfirmEmail('')
        setErrorPassword('')
        setErrorConfirmPass('')
        const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailReject.test(email) && email.length > 0){
            setErrorEmail('1');
            return;
        }
        if(email !== ConfirmEmail){
            setErrorConfirmEmail('2');
            return;
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(password) && password.length > 0){
            setErrorPassword('3');
            return;
        }
        if(password !== confirmPass){
            setErrorConfirmPass('4')
            return;
        }
        const user = {
            email: email,
            password: password,
            test:email,
        }
        axios.post(`${process.env.REACT_APP_API_URL}register`, user) ///Eliseo PONE LA RUTA DE BACK ACA XD
    }

    return(
        <div>
            <form>
                <label htmlFor='email' > Email </label>
                <input name='email' type='text' onChange={(e) => setemail(e.target.value)} required/>
                    <p>Invaild Email format</p>
                <label htmlFor='Cemail' > Confirm Email </label>
                <input name='Cemail' type='text' onChange={(e) => setConfirmEmail(e.target.value)} required/>
                    <p>Emails must be the same</p>
                <label htmlFor='password'> Password </label>
                <input name='password' onChange={(e) => setpassword(e.target.value)} type='password' required/>
                    <p>Minimum 8 characters</p>
                    <p>Maximum 15 characters</p>
                    <p>At least one capital letter</p>
                    <p>At least one minute letter</p>
                    <p>No blanks</p>
                    <p>At least 1 special character</p>
                <label htmlFor='Cpassword'> Confirm Password </label>
                <input name='Cpassword' onChange={(e) => setConfirmPass(e.target.value)} type='password' required/>
                    <p>Passwords must be the same</p>
            </form>
                <button onClick={SendToBackEnd}> Register </button>
        </div>
    )
}

export default RegisterWithEmail;