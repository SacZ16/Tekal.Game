import React, { useState, useEffect } from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainBottomLeft from '../Styles/images/brainBottomLeft.png';
import brainBottomRight from '../Styles/images/brainBottomRight.png';
import cerebritoHomeResults from '../Styles/prefinalmascota.png'
import Cookie from 'universal-cookie'
import '../Styles/home.css';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import RegisterWithEmail from '../Signin/RegisterEmail';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import cerebritoDerecha from '../Styles/cerebrito_derecha.png'
import { SendDataToBACK } from '../controllers/dbFunctions'

const Home = () => {
    const MySwal = withReactContent(Swal)
    const score = localStorage.getItem('score')

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
            title: <p style={{ color: 'white', marginBottom: 0, fontFamily: 'Montserrat, sans-serif' }}>Log in</p>,
            html:
                <div style={{ overflow: 'hidden' }}>
                    <RegisterCommonForm props={SendDataToBACK} style={{ posicion: 'absolute' }} />
                    <div style={{ display: 'flex' }}>
                        <a className='signUpText'>Don´t have an account?&nbsp;</a><a style={{ background: 'none', marginTop: '15px', color: 'white', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }} onClick={pruebare}>Register</a>
                    </div>
                </div>
            ,
            showCloseButton: true,
            confirmButtonText: login,
            showConfirmButton: false
        })
    }
    const pruebare = () => {
        MySwal.fire({
            title: <p style={{ color: 'white', marginBottom: 0, fontFamily: 'Montserrat, sans-serif' }}>Sign up</p>,
            html:
                <div style={{ overflow: 'hidden' }}>
                    <RegisterWithEmail style={{ posicion: 'absolute' }} />
                    <div style={{ display: 'flex' }}>
                        <a className='signUpText'>Do you have an account already?&nbsp;</a><a style={{ background: 'none', marginTop: '15px', color: 'white', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }} onClick={prueba}>Log in</a>
                    </div>
                </div>
            ,
            showCloseButton: true,
            showConfirmButton: false
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


    var enviardatos = {
        emailvar: email,
        passwordvar: password,
        confirmPassvar: confirmPass,
        namevar: name,
        lastnamevar: lastName,
        dateofbirthvar: dateofbirth,
        countryvar: country,
        cityvar: city,
        generovar: genero,
        ethnicityvar: ethnicity
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



        /*   const emailReject = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
          } */
    }
    console.log(input)
    //-----------

    const [show, setShow] = useState(false)
    const [sessionOn, setSessionOn] = useState(false) //setear para que funcione bien
    const [login, setLogin] = useState(true) //setear para que funcione bien
    const [startGame, setStartGame] = useState(false) //setear para que funcione bien
    const [checker, setchecker] = useState(false)


    const cookies = new Cookie();

    const popUpRegister = () => {
        /* setPopUpRegisterAux('flex')
        setBlurFondo('2px') */
    }

    const popUpLogin = () => {
        /*  setPopUpLoginAux('flex')
         setBlurFondo('2px') */
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

    const mood = (e) => {
        if (e.target.id === 'video') localStorage.setItem('mode', e.target.id)
        if (e.target.id === 'image') localStorage.setItem('mode', e.target.id)
        const lastStorageDay = localStorage.getItem('date')
        const currentDate = new Date();
        const day = currentDate.getDay();
        if (lastStorageDay != day) {
            MySwal.fire({
                html:
                    <div>
                        <h2 className='moods-title'>How do you fell to play today?</h2>
                        <div className='moods-img'>
                            <span id='fine' onClick={mood2}>😁</span>
                            <span id='normal' onClick={mood2}>😐</span>
                            <span id='bad' onClick={mood2}>☹️</span>
                        </div>
                    </div>,
                showConfirmButton: false,

            })
        } else {
            window.location.href = ('/game')
        }
    }

    const playWithOutLogin = () => {
        localStorage.setItem('mode', 'video')
        window.location.href = ('/game')
    }

    var lnks = Array.from(document.getElementsByTagName('a'));

    lnks.forEach(function (v) {
        if (/#[a-z,0-9]+/.test(v.hash))
            v.addEventListener("click", animScroll, false)
    })

    function animScroll(event) {
        var id, dst, despY;
        event.preventDefault();
        id = event.currentTarget.hash.replace(/#/, '');
        dst = document.getElementById(id);
        despY = parseInt(dst.getBoundingClientRect().top)
        window.scrollBy({
            left: 0, top: despY, behavior: 'smooth'
        });

    }

    return (
        <>
            <div className='homeDiv'>
                <section>
                    <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />
                    {startGame ?
                        <>
                            <img className='cerebritoHomeResults' src={cerebritoHomeResults} alt="imagen_mascota" />
                            <p className='textHomeSession'>Welcome &nbsp; <span className='memory_style'>Maximiliano</span></p>
                            <div className='scores'>
                                <div className='column_scores'>
                                    <h4>Last score</h4>
                                    <p>{score ? `${score}%` : 0}</p>
                                </div>
                                <div className='column_scores'>
                                    <h4>Average score</h4>
                                    <p>68%</p>
                                </div>
                            </div>
                            <div className='buttonsHome'>
                                <div className='startGame'><Link onClick={mood} style={{ color: 'white', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='video'>Videos</Link></div>
                                <div className='startGame'><Link onClick={mood} style={{ color: 'white', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='image'>Images</Link></div>
                            </div>
                        </> : (null)}
                </section>

                <CurrentSession />
                {login ?
                    <>
                        <img className='stars' src={stars} alt="starsBackground" id='stars' style={{ left: (0 + offset * 0.1) + '%' }} />
                        <p className='textHome' style={{ opacity: (100 + offset * -0.15) + '%', bottom: (50 + offset * -0.1) + '%' }}>Discover how good <br /> is your <span className='memory_style'>memory</span></p>
                        <p className='sub_textHome' style={{ opacity: (100 + offset * -9) + '%', bottom: (45 + offset * -0.1) + '%' }}>It takes only 10 min to discover how good is your memory.<br /> Are you ready?</p>
                        <div className='container_buttons_home'>
                            <button className='registerHome' onClick={pruebare}>Sign up</button>
                            <button className='loginHome' onClick={prueba}>Log in</button>
                        </div>

                        <a href='#second_screen' className='button_scroll' style={{ opacity: (100 + offset * -5) + '%' }}><span></span></a>
                        <img className='brainsBottom' src={brainBottomLeft} alt="brainsBackground" id='brainsBottomLeft' style={{ left: (-1 + offset * -0.1) + '%', bottom: (-7) }} />
                        <img className='brainsBottom' src={brainBottomRight} alt="brainsBackground" id='brainsBottomRight' style={{ right: (0 + offset * -0.1) + '%' }} />

                        <div className='second_screen_home' id='second_screen'>
                            <button className='auxiliarFondo'></button>
                            <button className='auxiliarFondoDerecha'></button>
                            <div className='text_secon_page'>
                                <p className='second_page_title'>How is your <br /> <span className='memory_style'>memory</span> working?</p>
                                <p className='second_page_subtitle'>Lorem ipsum, dolor sit amet. Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.</p>
                                <Link >
                                    <button onClick={playWithOutLogin} className='startGameLanding'>Start playing</button>
                                </Link>
                            </div>
                            <img className='brain_right' src={cerebritoDerecha} alt="brain" id='brain' style={{ left: (67 + offset * -0.1) + '%' }} />
                        </div>
                    </>
                    : (null)}
            </div>
        </>
    )
};

export default Home;