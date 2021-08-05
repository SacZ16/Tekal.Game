import React, {useState,  useEffect  } from 'react';
import Particles from 'react-particles-js'
import axios from 'axios';
import '../Styles/login.css';
import logoTekal from '../Styles/tekalLogo.png';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import Cookie from 'universal-cookie'
import {SendDataToBACK} from '../controllers/dbFunctions'

const LoginPage = () => {
    const cookies= new Cookie();
    useEffect(()=>{
        if (cookies.get('userInfo')){
            window.location.href='./'
        }
    })
    console.log(cookies.get('userInfo'))
    return (
        <div>
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
            <p className='copyright'>© 2021 Tekal, Inc. All rights reserved</p>
            <RegisterCommonForm props={SendDataToBACK}/>
        </div>
    )
};

export default LoginPage;