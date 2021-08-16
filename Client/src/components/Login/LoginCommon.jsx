import React, {useState,  useEffect  } from 'react';
import Particles from 'react-particles-js'
import axios from 'axios';
import '../Styles/login.css';
import logoTekal from '../Styles/tekalLogo.png';
import logoTekalAzul from '../Styles/tekallogoazul.png';
import wavee from '../Styles/wave.png'
import RegisterCommonForm from '../Signin/LoginCommonForm';
import Cookie from 'universal-cookie'
import {SendDataToBACK} from '../controllers/dbFunctions'



const LoginPage = () => {
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
            window.location.href='./'
        }
    })
    console.log(cookies.get('userInfo'))
    if(cookies.get('userInfo')){return window.location.href='./'}
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


    
    return (
        <div>
            {!a || a==='false'?<input type='checkbox' className='checkbox' onChange={cambiarfondo} id='check' ></input>:<input type='checkbox' className='checkbox' onChange={cambiarfondo} id='check' defaultChecked></input>}
            <label className='switch' for='check' ></label>
            <div style={!a?{'background':`black`,'transition': 'all 0.5s ease-out'}:{'background':`${cookiies.get('fondo')}`,'transition': 'all 0.5s ease-out'}} className='bgLanding'>
           {cookiies.get('fondo')==='black' || !a? <Particles
                params={{'particles':{"number":{"value":96,"density":{"enable":true,"value_area":800}}},'line_linked':{'width':'2'},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"}}}}}
            />:<div className="wave"></div>}
            </div>
            {cookiies.get('fondo')==='black'|| !a?<img className='logoTekal' src={logoTekal} alt="Logo de Tekal"/>:<img className='logoTekal' src={logoTekalAzul} alt="Logo de Tekal"/>}
            <div className='screenText'>
                <h1 style={!a?{'color': `white`,'transition': 'all 0.5s ease-out'}:{'color': `${cookiies.get('texto')}`,'transition': 'all 0.5s ease-out'}} className='check'>Check how your</h1>
                <div className='text2'>
                    <h1  style={!a?{'color': `#F22C9F`,'transition': 'all 0.5s ease-out'}:{'color': `${cookiies.get('textomemory')}`,'transition': 'all 0.5s ease-out'}} className='memory'>memory&nbsp;</h1>
                    <h1 style={!a?{'color': `white`,'transition': 'all 0.5s ease-out'}:{'color': `${cookiies.get('texto')}`,'transition': 'all 0.5s ease-out'}} className='working'>is working</h1> 
            </div>
            <p  style={!a?{'color': `rgb(197, 197, 197)`,'transition': 'all 0.5s ease-out'}:{'color': `${cookiies.get('textolargo')}`,'transition': 'all 0.5s ease-out'}} className='loremLogin'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris.
            </p>
            </div>
            <p style={!a?{'color': `rgb(197, 197, 197)`,'transition': 'all 0.5s ease-out'}:{'color': `${cookiies.get('copyr')}`,'transition': 'all 0.5s ease-out'}} className='copyright'>© 2021 Tekal, Inc. All rights reserved</p>
            <RegisterCommonForm props={SendDataToBACK} coloresprop={colores}/>

        </div>
    )
};

export default LoginPage;