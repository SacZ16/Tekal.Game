import React, {useState,  useEffect  } from 'react';
import Particles from 'react-particles-js'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import '../Styles/login.css';
import logoTekal from '../Styles/tekalLogo.png';
import logoTekalAzul from '../Styles/tekallogoazul.png';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import Cookie from 'universal-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SendDataToBACK } from '../controllers/dbFunctions'
import GoogleButton from '../Signin/GoogleButton';
import FacebookButton from '../Signin/FacebookButton';
import RegisterWithEmail from '../Signin/RegisterEmail';

const PreFinalgame = () => {
    const MySwal = withReactContent(Swal)
    const cookies= new Cookie();
    const cookiies= new Cookie(); //no borrar - estilo css
    const [pruebaa,setPruebaa]=useState('')
    const [colores,setColores]=useState({
        fondo:cookiies.get('colores'),
        texto:'white',
        textomemory:'#F22C9F',
        textolargo:'rgb(197, 197, 197)',
        fondoform:'rgba(0, 0, 0, 0.904)',
        copyr:'rgb(197, 197, 197)'
    })
    cookiies.set('colores',`${colores.fondo}`,{path:'/'})//no borrar - estilo css
    // console.log(colores)
    useEffect(()=>{
        if (cookies.get('userInfo')){
            window.location.href='./close'
        }
    })
    console.log(cookies.get('userInfo'))
    if(cookies.get('userInfo')){return window.location.href='./close'}
    const cambiarfondo = function (evento) {
        if (evento.target.checked) {   
            setColores({
                fondo:'black',
        texto:'white',
        textomemory:'#F22C9F',
        textolargo:'rgb(197, 197, 197)',
        fondoform:'rgba(0, 0, 0, 0.904)',
        copyr:'rgb(197, 197, 197)'
            })  
            cookiies.set('prueba','true',{path:'/'})//no borrar - estilo css
            cookiies.set('fondo','#F0F8FB',{path:'/'})//no borrar - estilo css
            cookiies.set('texto','#2D5DC7',{path:'/'})//no borrar - estilo css
            cookiies.set('textomemory','#F0814A',{path:'/'})//no borrar - estilo css
            cookiies.set('textolargo','#1240A7',{path:'/'})//no borrar - estilo css
            cookiies.set('fondoform','#FFFFFF',{path:'/'})//no borrar - estilo css
            cookiies.set('copyr','black',{path:'/'})
        } else {
            setColores({
                fondo:'black',
        texto:'white',
        textomemory:'#F22C9F',
        textolargo:'rgb(197, 197, 197)',
        fondoform:'rgba(0, 0, 0, 0.904)',
        copyr:'rgb(197, 197, 197)'
            })  
            cookiies.set('prueba','false',{path:'/'})//no borrar - estilo css
            cookiies.set('fondo','black',{path:'/'})//no borrar - estilo css
            cookiies.set('texto','white',{path:'/'})//no borrar - estilo css
            cookiies.set('textomemory','#F22C9F',{path:'/'})//no borrar - estilo css
            cookiies.set('textolargo','rgb(197, 197, 197)',{path:'/'})//no borrar - estilo css
            cookiies.set('fondoform','rgba(0, 0, 0, 0.904)',{path:'/'})//no borrar - estilo css
            cookiies.set('copyr','rgb(197, 197, 197)',{path:'/'})//no borrar - estilo css
        }
    }
    var a = cookiies.get('prueba')
    const prueba = () => {
        MySwal.fire({
            title: 'Log in',
            html:
                // <div class="row" onChange={handleInputChange}>
                //     <div class="column" >
                //             <p class="dddd">Name</p>
                //             <input class="swal2-inputmh4" name='name'/>
                //             <p class="dddd">Date of bith</p>
                //             <input class="swal2-inputmh4" type='date' name='date' />
                //             <p class="dddd">Country</p>
                //             <input class="swal2-inputmh4" name='country'/>
                //             <p class="dddd">Password</p>
                //             <input style={colorpasswordb} id='pass' class="swal2-inputmh4" name='password' type='password' />
                //             <p class="dddd">Genero</p>
                //             <input class="swal2-inputmh4" name='genero'/>
                //             <GoogleButton />                        
                //     </div>
                //     <div class="column" >
                //             <p class="dddd">Last Name</p>
                //             <input class="swal2-inputmh4" name='lastname' />
                //             <p class="dddd">Email</p>
                //             <input style={coloremailb} id='email' class="swal2-inputmh4" name='email' />
                //             <p class="dddd">City/state</p>
                //             <input class="swal2-inputmh4" name='city'/>
                //             <p class="dddd">Confirm Password</p>
                //             <input style={colorconfirmPassb} id='confpass' class="swal2-inputmh4" name='confirmPass' type='password' />
                //             <p class="dddd">Ethnicity</p>
                //             <input class="swal2-inputmh4" name='ethnicity'/>
                //             <FacebookButton />
                //             <button onClick={()=>mostrarLogin()}></button>
                //     </div>
                // </div>
                <div style={{overflow:'hidden'}}>
                <RegisterCommonForm props={SendDataToBACK} style={{posicion:'absolute'}}/>
                <div style={{display:'flex'}}>
                <a className='signUpText'>Don´t have an account?</a><a style={{background:'none'}} onClick={pruebare}>register</a>

                </div>
                </div>
                ,
                showCloseButton:true,
            showConfirmButton:false


        })
    }
    const pruebare = () => {
        MySwal.fire({
            title: 'Sing up',
            html:
                <div style={{overflow:'hidden'}}>
                <RegisterWithEmail style={{posicion:'absolute'}}/>
                <div style={{display:'flex'}}>
                <a className='signUpText'>have an account?</a><a style={{background:'none'}} onClick={prueba}>login</a>

                </div>
                </div>
                ,
                showCloseButton:true,
                showConfirmButton:false


        })
    }
    return (
        <div>
            <button onClick={pruebare}>Sign up</button>
            <button onClick={prueba}>Log in</button>
        </div>
    )
};

export default withRouter(PreFinalgame)