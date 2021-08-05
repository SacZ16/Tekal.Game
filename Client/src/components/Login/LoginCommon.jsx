import React, {useState} from 'react';
import Particles from 'react-particles-js'
import axios from 'axios';
import '../Styles/login.css';
import logoTekal from '../Styles/tekalLogo.png';
import RegisterCommonForm from '../Signin/RegisterCommonForm';


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let a = process.env

    console.log(a)

    const SendDataToBACK = async (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
        const objPost = {
            email: email,
            password: password,
        }
        await axios({
            url: 'http://localhost:3001/login',
            method: 'POST',
            data: objPost
        })
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
    }

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
            <RegisterCommonForm/>
        </div>
    )
};

export default LoginPage;