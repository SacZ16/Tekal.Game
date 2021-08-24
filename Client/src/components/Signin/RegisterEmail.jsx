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
{/* <div style={{ 'transition': 'all 0.5s ease-out' }} className='formRegister'>
                <form className='formRegister2'>
                    <img className='logoFormRegister' src={logoTekal} alt="Logo de Tekal" />
                    <div>
                        <input style={coloremailb} className='inputFormRegister' placeholder='Email' name='email' type='text' onChange={handleInputChange} required />
                        {/* <div class="popup" onClick={() => myFunction()}>❓
                            <span class="popuptext" id="myPopup1">Invalid Email format</span>
                        </div> */}
                    //</div>
                    {/* <p>Invalid Email format</p> */}
                    //<div>
                      //  <input style={colorconfirmEmailb} className='inputFormRegister' placeholder='Confirm email' name='confirmEmail' type='text' onChange={handleInputChange} required /> 
                        {/* <div class="popup" onClick={() => myFunction2()}>❓
                            <span class="popuptext" id="myPopup">Email must be the same</span>
                        </div> */}
                  //  </div>
                    {/* <p>Email must be the same</p> */}
                    //<div>
                      // <input style={colorpasswordb} className='inputFormRegister' placeholder='Password' name='password' onChange={handleInputChange} type='password' required /> 
                        {/* <div class="popup" onClick={() => myFunction3()}>❓
                            <span class="popuptext" id="myPopup2"><p>Minimum 8 characters</p>
                                <p>Maximum 15 characters</p>
                                <p>At least one capital number</p>
                                <p>At least one capital letter</p>
                                <p>At least one lower case letter</p>
                                <p>No blanks</p>
                                <p>At least 1 special character</p></span>
                        </div> */}
                  //  </div>
                    {/*  <p>Minimum 8 characters</p>
                    <p>Maximum 15 characters</p>
                    <p>At least one capital number</p>
                    <p>At least one capital letter</p>
                    <p>At least one lower case letter</p>
                    <p>No blanks</p>
                <p>At least 1 special character</p> */}
                  //  <div>
                    //    <input style={colorconfirmPassb} className='inputFormRegister' placeholder='Confirm password' name='confirmPass' onChange={handleInputChange} type='password' required /> 
                        {/* <div class="popup" onClick={() => myFunction4()}>❓
                            <span class="popuptext" id="myPopup3">Passwords must be the same</span>
                        </div> */}
                  //  </div>
                    {/* <p>Passwords must be the same</p> */}
                //</form>
                //<div className='formRegister2'>

                  //  <button className='buttonRegister' onClick={SendToBackEnd}> Register </button>
                    //<p className='orRegister'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
                    //<GoogleButton />
                    //<FacebookButton />
                //</div>
            //</div> */}
const RegisterWithEmail = () => {
    const cookiies = new Cookie(); //no borrar - estilo css
    const [emailcopia, setEmailcopia] = useState('')
    const [passwordcopia, setPasswordcopia] = useState('')
    const [coloremail, setColoremail] = useState('')
    const [colorconfirmEmail, setColorconfirmEmail] = useState('')
    const [colorpassword, setColorpassword] = useState('')
    const [colorconfirmPass, setColorconfirmPass] = useState('')
    const [colores, setColores] = useState({
        fondo: cookiies.get('colores'),
        texto: 'white',
        textomemory: '#F22C9F',
        textolargo: 'rgb(197, 197, 197)',
        fondoform: 'rgba(0, 0, 0, 0.904)',
        copyr: 'rgb(197, 197, 197)'
    })

    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPass: "",
        name:"",
        lastname:"",
        country:"",
        age:"",
        city: "",
        gender: "prefer-not-to-say",
        ethnicity: "",
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
            name: input.name,
            lastname:input.lastname,
            country:input.country,
            age:input.age,
            city: input.city,
            gender: input.gender,
            ethnicity: input.ethnicity,
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
        const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailReject.test(input.email) && input.email.length > 1) {
            setColoremail("red",)
        } if (emailReject.test(input.email) && input.email.length > 1) {
            setColoremail("#1663A2")
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(input.password) && input.password.length > 1) {
            setColorpassword("red")
        } if (passwordReject.test(input.password) && input.password.length > 1) {
            setColorpassword("#1663A2")
        }
        setPasswordcopia(input.password.substring(0, input.password.length - 1))
        if (passwordcopia !== input.confirmPass && input.confirmPass.length > 1) {
            setColorconfirmPass("red")
        } if (passwordcopia === input.confirmPass && input.confirmPass.length > 1) {
            setColorconfirmPass("#1663A2")
        }
    }
    var coloremailb = { 'border-color': `${coloremail}` }
    var colorpasswordb = { 'border-color': `${colorpassword}` }
    var colorconfirmPassb = { 'border-color': `${colorconfirmPass}` }
    function myFunction() {
        var popup = document.getElementById("myPopup1");
        popup.classList.toggle("show");
    }
    function myFunction2() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }
    function myFunction3() {
        var popup = document.getElementById("myPopup2");
        popup.classList.toggle("show");
    }
    function myFunction4() {
        var popup = document.getElementById("myPopup3");
        popup.classList.toggle("show");
    }
    const cambiarfondo = function (evento) {
        if (evento.target.checked) {
            setColores({
                fondo: 'black',
                texto: 'white',
                textomemory: '#F22C9F',
                textolargo: 'rgb(197, 197, 197)',
                fondoform: 'rgba(0, 0, 0, 0.904)',
                copyr: 'rgb(197, 197, 197)'
            })
            cookiies.set('prueba', 'true', { path: '/' })//no borrar - estilo css
            cookiies.set('fondo', '#F0F8FB', { path: '/' })//no borrar - estilo css
            cookiies.set('texto', '#2D5DC7', { path: '/' })//no borrar - estilo css
            cookiies.set('textomemory', '#F0814A', { path: '/' })//no borrar - estilo css
            cookiies.set('textolargo', '#1240A7', { path: '/' })//no borrar - estilo css
            cookiies.set('fondoform', '#FFFFFF', { path: '/' })//no borrar - estilo css
            cookiies.set('copyr', 'black', { path: '/' })
        } else {
            setColores({
                fondo: 'black',
                texto: 'white',
                textomemory: '#F22C9F',
                textolargo: 'rgb(197, 197, 197)',
                fondoform: 'rgba(0, 0, 0, 0.904)',
                copyr: 'rgb(197, 197, 197)'
            })
            cookiies.set('prueba', 'false', { path: '/' })//no borrar - estilo css
            cookiies.set('fondo', 'black', { path: '/' })//no borrar - estilo css
            cookiies.set('texto', 'white', { path: '/' })//no borrar - estilo css
            cookiies.set('textomemory', '#F22C9F', { path: '/' })//no borrar - estilo css
            cookiies.set('textolargo', 'rgb(197, 197, 197)', { path: '/' })//no borrar - estilo css
            cookiies.set('fondoform', 'rgba(0, 0, 0, 0.904)', { path: '/' })//no borrar - estilo css
            cookiies.set('copyr', 'rgb(197, 197, 197)', { path: '/' })//no borrar - estilo css
        }
    }
    var a = cookiies.get('prueba')

    return (
        <>      
        <div class="row" onChange={handleInputChange}>
                    <div class="column" >
                            <p class="dddd">Name</p>
                            <input class="swal2-inputmh4" name='name' onChange={handleInputChange}/>
                            <p class="dddd">Date of birth</p>
                            <input class="swal2-inputmh4" type='date' name='age' onChange={handleInputChange}/>
                            <p class="dddd">Country</p>
                            <input class="swal2-inputmh4" name='country'onChange={handleInputChange}/>
                            <p class="dddd">Password</p>
                            <input style={colorpasswordb} id='pass' class="swal2-inputmh4" name='password' type='password' onChange={handleInputChange} />
                            <p class="dddd">Gender</p>
                            <select class="swal2-inputmh4" name='gender' onChange={handleInputChange}>
                                <option value='prefer-not-to-answer'> Prefer not to say </option>
                                <option value='male'> Male </option>
                                <option value='female'> Female </option>
                                <option value='non-binary'> Non binary </option>
                            </select>
                            <GoogleButton />                        
                    </div>
                    <div class="column" >
                            <p class="dddd" >Last Name</p>
                            <input class="swal2-inputmh4" name='lastname' onChange={handleInputChange}/>
                            <p class="dddd">Email</p>
                            <input style={coloremailb} id='email' class="swal2-inputmh4" name='email' onChange={handleInputChange}/>
                            <p class="dddd">City/state</p>
                            <input class="swal2-inputmh4" name='city'  onChange={handleInputChange}/>
                            <p className="dddd">Confirm Password</p>
                            <input style={colorconfirmPassb} id='confpass' class="swal2-inputmh4" name='confirmPass' type='password' onChange={handleInputChange} />
                            <p class="dddd">Ethnicity</p>
                            <input class="swal2-inputmh4" name='ethnicity' onChange={handleInputChange}/>
                            <FacebookButton />
                    </div>
                </div>
                <button className='buttonRegister' onClick={SendToBackEnd}> Register </button>
            
        </>
    )
}

export default RegisterWithEmail;