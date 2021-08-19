import React, { useState, useEffect } from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainBottomLeft from '../Styles/images/brainBottomLeft.png';
import brainBottomRight from '../Styles/images/brainBottomRight.png';
import Cookie from 'universal-cookie'
import '../Styles/home.css';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import RegisterWithEmail from '../Signin/RegisterEmail';
import { Link } from 'react-router-dom';
import Tutorial from '../Tutorial/Tutorial'
import axios from 'axios';
import Swal from 'sweetalert2'
import cerebritoDerecha from '../Styles/cerebrito_derecha.png'
import withReactContent from 'sweetalert2-react-content'
import { SendDataToBACK } from '../controllers/dbFunctions'

const Home = () => {
    const MySwal = withReactContent(Swal)
    const [offset, setOffset] = useState()

    const [passwordcopia, setPasswordcopia] = useState('')

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateofbirth, setDateofbirth] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [genero, setGenero] = useState('')
    const [ethnicity, setEthnicity] = useState('')
    const [input, setInput] = useState({
        email: email,
        password: password,
        confirmPass: confirmPass,
    })
    const handleScroll = () => {
        setOffset(window.pageYOffset)
    }
    if (localStorage.getItem('pruebaa')) { localStorage.removeItem('pruebaa') }
    window.addEventListener('scroll', handleScroll)
    const prueba = () => {
        MySwal.fire({
            title: 'Log in',
            html:
                <div style={{overflow:'hidden'}}>
                <RegisterCommonForm props={SendDataToBACK} style={{posicion:'absolute'}}/>
                <div style={{display:'flex'}}>
                <a className='signUpText'>Don´t have an account?</a><a style={{background:'none'}} onClick={pruebare}>register</a>

                </div>
                </div>
                ,
                showCloseButton:true,
            confirmButtonText: login,
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

    // Register Form
    const SendToBackEnd = async (e) => {
        e.preventDefault()
        const emailReject = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
        if (!emailReject.test(input.email) && input.email.length > 0) {
            return;
        }
        if (input.email !== input.confirmEmail) {
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
        }
        console.log(user)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}register`, user) ///Eliseo PONE LA RUTA DE BACK ACA XD
        if (response.data.status) {
            alert('Usuario Registrado con Exito')
            window.location.href = './login'
        }
        else { alert('ESE MAIL YA ESTÁ EN USO') }
    }


var enviardatos={
    emailvar: email,
    passwordvar:password,
    confirmPassvar:confirmPass,
    namevar:name,
    lastnamevar:lastName,
    dateofbirthvar:dateofbirth,
    countryvar:country,
    cityvar:city,
    generovar:genero,
    ethnicityvar:ethnicity
}
    console.log(enviardatos)
    const handleInputChange = function (e) {
        // console.log(e.target.value)
        if (e.target.name === 'email') setEmail(e.target.value)
        if (e.target.name === 'password') setPassword(e.target.value)
        if (e.target.name === 'confirmPass') setConfirmPass(e.target.value)
        if (e.target.name === 'name') setName(e.target.value)
        if (e.target.name === 'lastname') setLastName(e.target.value)
        if (e.target.name === 'date') setDateofbirth(e.target.value)
        if (e.target.name === 'country') setCountry(e.target.value)
        if (e.target.name === 'city') setCity(e.target.value)
        if (e.target.name === 'genero') setGenero(e.target.value)
        if (e.target.name === 'ethnicity') setEthnicity(e.target.value)
        setInput({
            ...input,
            email: email,
            password: password,
            confirmPass: confirmPass
        })
        


        const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailReject.test(input.email) && input.email.length > 1) {
            setColoremail("red")
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
    console.log(input)
    //-----------

    const [show, setShow] = useState(false)
    const [sessionOn, setSessionOn] = useState(false)
    const [login, setLogin] = useState(true)
    const [startGame, setStartGame] = useState(false)
    const [checker, setchecker] = useState(false)

    
    const cookies = new Cookie();

    const popUpRegister = () => {
        setPopUpRegisterAux('flex')
        setBlurFondo('2px')
    }

    const popUpLogin = () => {
        setPopUpLoginAux('flex')
        setBlurFondo('2px')
    }

    if (cookies.get('userInfo') && !checker) {
        setStartGame(true)
        setLogin(false)
        setSessionOn(true)
        setchecker(true)
    }

    const CurrentSession = () => {
        return (
            <div >
                {sessionOn ?
                    <div className='sessionBox'>
                        <div className='boxDisplay'>
                            <img className='profilePic' src='https://clinicacontraadicciones.mx/wp-content/uploads/2020/10/TESTIMONIO.jpg' alt='profile_pic' />
                            <div className='textBox'>
                                <p className='sessionName'>Maximiliano</p>
                                <p className='sessionStatus'>Online</p>
                            </div>
                            <button className='btnOpenSessionMenu' onClick={e => { setShow(!show) }}>&#9660;</button>
                        </div>
                        {show ?
                            <button className='btnLogOut' onClick={() => {
                                cookies.remove('userInfo')
                                window.location.href = ('')
                            }}>Log out</button> : (null)
                        }
                    </div> : (null)}
            </div>
        )
    }

    const mood2 = (e) => {
        const currentDate = new Date();
        const day = currentDate.getDay();
        localStorage.setItem('mood', e.target.id)
        localStorage.setItem('date', day)
        window.location.href = ('/game')
        MySwal.clickConfirm()
    }

    const mood = () => {
        const lastStorageDay = localStorage.getItem('date')
        const currentDate = new Date();
        const day = currentDate.getDay();
        if (lastStorageDay != day) {
            MySwal.fire({
                title: <div style={{ borderStyle: 'solid', borderColor: 'red' }}>
                    <h3>How do you fell to play today?</h3>
                    <span id='fine' onClick={mood2}>😁</span>
                    <span id='normal' onClick={mood2}>😐</span>
                    <span id='bad' onClick={mood2}>☹️</span>
                </div>,
                showConfirmButton: false
            })
        } else {
            window.location.href = ('/game')
        }
    }

    return (
        <>
            <div className='homeDiv'>
                <section>
                    <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />
                    <img className='stars' src={stars} alt="starsBackground" id='stars' style={{ left: (0 + offset * 0.1) + '%' }} />
                    {startGame ?
                        <>
                            <p className='textHome' style={{ opacity: (100 + offset * -0.15) + '%', bottom: (50 + offset * -0.1) + '%' }}>Discover how good <br /> is your <span className='memory_style'>memory</span></p>
                            <p className='sub_textHome' style={{ opacity: (100 + offset * -5) + '%' }}>It takes only 10 min to discover how good is your memory.<br /> Are you ready?</p>
                            <div className='buttonsHome' style={{ opacity: (100 + offset * -0.45) + '%', bottom: (25 + offset * -0.1) + '%' }}>
                                <div className='startGame'><Link onClick={mood} style={{ color: '#800FC7', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='btnStartHome'>Start</Link></div>
                            </div>
                        </> : (null)}
                    <img className='brainsBottom' src={brainBottomLeft} alt="brainsBackground" id='brainsBottomLeft' style={{ left: (-1 + offset * -0.1) + '%', bottom: (-7) }} />
                    <img className='brainsBottom' src={brainBottomRight} alt="brainsBackground" id='brainsBottomRight' style={{ right: (0 + offset * -0.1) + '%' }} />
                </section>

                <CurrentSession />
                {login ?
                    <>
                        <p className='textHome' style={{ opacity: (100 + offset * -0.15) + '%', bottom: (50 + offset * -0.1) + '%' }}>Discover how good <br /> is your <span className='memory_style'>memory</span></p>
                        <p className='sub_textHome' style={{ opacity: (100 + offset * -5) + '%' }}>It takes only 10 min to discover how good is your memory.<br /> Are you ready?</p>
                        <div className='container_buttons_home'>
                            <button className='registerHome' onClick={pruebare}>Sign up</button>
                            <button className='loginHome' onClick={prueba}>Log in</button>
                        </div>
                    </>
                    : (null)}
            </div>

            <div className='second_screen_home'>
            <div className='text_secon_page'  style={{ opacity: (0 + offset * 5) + '%' }}>
                <p className='second_page_title'>How is your memory working?</p>
                <p className='second_page_subtitle'>Lorem ipsum, dolor sit amet.</p>
                <div className='startGameLanding'><Link to='/game' style={{ color: 'white', fontSize: '35px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif', marginTop:'10px' }} id='btnStartHome'>Start</Link></div>
            </div>
                <img className='brain_right' src={cerebritoDerecha} alt="brain" id='brain' style={{height:'500px',left: (75 + offset * -0.1) + '%' }} />
            </div>
        </>
    )
};

export default Home;