import React, {useState} from 'react';
import axios from 'axios';
import Particles from 'react-particles-js'
import logoTekal from '../Styles/tekalLogo.png';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import '../Styles/registerForm.css';
const RegisterWithEmail = () => {
    const [emailcopia,setEmailcopia]=useState('')
    const [passwordcopia,setPasswordcopia]=useState('')
    const [coloremail,setColoremail]=useState('')
    const [colorconfirmEmail,setColorconfirmEmail]=useState('')
    const [colorpassword,setColorpassword]=useState('')
    const [colorconfirmPass,setColorconfirmPass]=useState('')
           
    const [input,setInput]= useState({        
        email:"",
        emailcopia:'',
        confirmEmail: "",
        password:"",
        confirmPass:"",
    })

    //Estos van a estar seteando errores (osea cuando los inputs se rellenen mal estos estados van a tener algo adentro)
    const [errorEmail, setErrorEmail] = useState('');
    const [errorConfirmEmail, setErrorConfirmEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPass, setErrorConfirmPass] = useState('');


    const SendToBackEnd = async (e) => {
        e.preventDefault()
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if (!emailReject.test(input.email) && input.email.length > 0){
            return;
        }
        if(input.email !== input.confirmEmail){
            return;
        }
        const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (!passwordReject.test(input.password) && input.password.length >= 0){
            return;
        }
        if(input.password !== input.confirmPass){
            return;
        }
        const user = {
            email: input.email,
            password: input.password,
            test:input.email,
        }
        console.log(user)
        const response=await axios.post(`${process.env.REACT_APP_API_URL}register`, user) ///Eliseo PONE LA RUTA DE BACK ACA XD
        if (response.data.status){alert('Usuario Registrado con Exito') 
        window.location.href='./login'}
        else{alert('ESE MAIL YA ES EN USO')}
}



const handleInputChange=function(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })  
    const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailReject.test(input.email) && input.email.length > 1){
        setColoremail("red",)
    }if(emailReject.test(input.email) && input.email.length > 1){
        setColoremail("#1663A2")
    }
    setEmailcopia(input.email.substring(0, input.email.length - 1))
    if(emailcopia !== input.confirmEmail && input.confirmEmail.length > 1){
        setColorconfirmEmail("red")
    }if(emailcopia === input.confirmEmail && input.confirmEmail.length > 1 || input.confirmEmail === input.email && input.confirmEmail.length > 1 ){
        setColorconfirmEmail("#1663A2")
    }
    const passwordReject = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (!passwordReject.test(input.password) && input.password.length > 1){
        setColorpassword("red")
    }if(passwordReject.test(input.password) && input.password.length > 1){
        setColorpassword("#1663A2")
    }
    setPasswordcopia(input.password.substring(0, input.password.length - 1))
    if(passwordcopia !== input.confirmPass && input.confirmPass.length > 1){
        setColorconfirmPass("red")
    }if(passwordcopia === input.confirmPass && input.confirmPass.length > 1){
        setColorconfirmPass("#1663A2")
    }
}
var coloremailb={'border-color':`${coloremail}`}
var colorconfirmEmailb={'border-color':`${colorconfirmEmail}`}
var colorpasswordb={'border-color':`${colorpassword}`}
var colorconfirmPassb={'border-color':`${colorconfirmPass}`}
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
    return(
        <>
        <div className='bgLanding'>
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
            <div className='formRegister'>
            <form className='formRegister2'>
            <img className='logoFormRegister' src={logoTekal} alt="Logo de Tekal"/>
            <div>
                <input  style={coloremailb} className='inputFormRegister' placeholder='Email' name='email' type='text' onChange={handleInputChange} required/>
                <div class="popup" onClick={()=>myFunction()}>❓
  <span class="popuptext" id="myPopup1">Invalid Email format</span>
</div>
            </div>
                    {/* <p>Invalid Email format</p> */}
                    <div>
                <input style={colorconfirmEmailb} className='inputFormRegister' placeholder='Confirm email' name='confirmEmail' type='text' onChange={handleInputChange} required/>
                <div class="popup" onClick={()=>myFunction2()}>❓
  <span class="popuptext" id="myPopup">Email must be the same</span>
</div>
                    </div>
                    {/* <p>Email must be the same</p> */}
                    <div>
                <input  style={colorpasswordb} className='inputFormRegister' placeholder='Password' name='password' onChange={handleInputChange} type='password' required/>
                <div class="popup" onClick={()=>myFunction3()}>❓
  <span class="popuptext" id="myPopup2"><p>Minimum 8 characters</p>
                    <p>Maximum 15 characters</p>
                    <p>At least one capital number</p>
                    <p>At least one capital letter</p>
                    <p>At least one lower case letter</p>
                    <p>No blanks</p>
                <p>At least 1 special character</p></span>
</div>
                </div>
                {/*  <p>Minimum 8 characters</p>
                    <p>Maximum 15 characters</p>
                    <p>At least one capital number</p>
                    <p>At least one capital letter</p>
                    <p>At least one lower case letter</p>
                    <p>No blanks</p>
                <p>At least 1 special character</p> */}
                <div>
                <input  style={colorconfirmPassb} className='inputFormRegister' placeholder='Confirm password' name='confirmPass' onChange={handleInputChange} type='password' required/>
                <div class="popup" onClick={()=>myFunction4()}>❓
  <span class="popuptext" id="myPopup3">Passwords must be the same</span>
</div>
                </div>
                    {/* <p>Passwords must be the same</p> */}
            </form>
            <div className='formRegister2'>

                <button className='buttonRegister' onClick={SendToBackEnd}> Register </button>
                <p className='orRegister'><hr className='hr' width='40%' color='lightgrey'></hr>or<hr class='hr' width='40%' color='lightgrey'></hr></p>
                <GoogleButton/>
                <FacebookButton/>
            </div>
                </div>
        </>
    )
}

export default RegisterWithEmail;