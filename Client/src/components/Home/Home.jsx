import React, { useState, useEffect } from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainBottomLeft from '../Styles/images/brainBottomLeft.png';
import brainBottomRight from '../Styles/images/brainBottomRight.png';
import cerebritoHomeResults from '../Styles/prefinalmascota.png'
import cerebroPerfil from '../Styles/cerebritoPerfil.png'
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
import Loading from '../Loading/Loading';
//-----------------
import MenuIcon from '@material-ui/icons/Menu';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GameModes from '../GameModes/GameModes';

const Home = () => {
    const MySwal = withReactContent(Swal)
    const score = localStorage.getItem('score')
    const mood = localStorage.getItem('mood')
    const cookies = new Cookie();
    console.log(cookies.get('userInfo'))
    var emailCokkie;


    if (cookies.get('userInfo')) {
        if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
        else { emailCokkie = cookies.get('userInfo').Items[0].email }
    }

    const [offset, setOffset] = useState()
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

    //-----------

    const [show, setShow] = useState(false)
    const [sessionOn, setSessionOn] = useState(false) //setear para que funcione bien
    const [login, setLogin] = useState(true) //setear para que funcione bien
    const [startGame, setStartGame] = useState(false) //setear para que funcione bien
    const [checker, setchecker] = useState(false)
    const [showMobileLogOut, setShowMobileLogOut] = useState(false)

    let sessionUser = "";

    if (cookies.get('userInfo')) {
        if (cookies.get('userInfo').Items) {
            sessionUser = cookies.get('userInfo').Items[0].name
        } else {
            sessionUser = cookies.get('userInfo')[0].name
        }
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

                            <img className='profilePic' src={cerebroPerfil} alt='profile_pic' />

                            <div className='textBox'>
                                <p className='sessionName'>{sessionUser}</p>
                                <p className='sessionStatus'>Online</p>
                            </div>
                            <button className='btnOpenSessionMenu' onClick={() => { setShow(!show) }}>&#9660;</button>
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

    const [averageScore, setAverageScore] = useState()

    useEffect(async () => {
        const res = await axios.post('http://localhost:3001/averageScore', {
            email: emailCokkie,
            // mode: mode
        })
        setAverageScore(res.data.averageScore)
    }, [])

    const popUpGameMode = () => {
        MySwal.fire({
            html:
                <div>
                    <GameModes />
                </div>
            ,
            showCloseButton: true,
            showConfirmButton: false
        })
    }
    return (
        <>
            {login ?
                <div className="pantallamovil">
                    <div className="contenedortextomovil">
                        <p className='subtitlemovil'>Lorem ipsum, dolor sit amet.</p>
                        <div className='startGameLandingMobile'><Link onClick={popUpGameMode} style={{ color: 'white', fontSize: '40px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', position: 'relative', top: '15%', left: '1.9%' }} id='btnStartHome'><PlayArrowIcon style={{ fontSize: '50px' }} /></Link></div>
                    </div>
                </div> : (null)
            }
            {startGame ?
                <div className="pantallaMovilScore">
                    <div className="contenedorTextoMovilScore">
                        <div>
                            <MenuIcon className='menuMobile' onClick={() => { setShowMobileLogOut(!showMobileLogOut) }} style={{ color: 'white', fontSize: '30px' }} />
                            {showMobileLogOut ?
                                <button className='logOutMobile' onClick={() => {
                                    cookies.remove('userInfo')
                                    window.location.href = ('')
                                }}>Log out</button> : null
                            }
                        </div>
                        <p className='textHomeSession'>Welcome &nbsp; <span className='memory_style'>{sessionUser}</span></p>
                        <div className='scores_mobile'>
                            <div className='column_scores_mobile'>
                                <h4>Last score</h4>
                                <p>35%</p>
                            </div>
                            <div className='column_scores_mobile'>
                                <h4>Average score</h4>
                                <p>{averageScore ? averageScore.toFixed(1) : 0}%</p>
                            </div>
                        </div>
                        <div className='startGameLandingMobile'><Link onClick={popUpGameMode} style={{ color: 'white', fontSize: '40px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', position: 'relative', top: '15%', left: '1.9%' }} id='btnStartHome'><PlayArrowIcon style={{ fontSize: '50px' }} /></Link></div>
                    </div>
                </div> : (null)
            }

            <div className='homeDiv'>
                <section>
                    <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />
                    {startGame ?
                        <>
                            <img className='cerebritoHomeResults' src={cerebritoHomeResults} alt="imagen_mascota" />
                            <p className='textHomeSession'>Welcome &nbsp; <span className='memory_style'>{sessionUser}</span></p>
                            <div className='scores'>
                                <div className='column_scores'>
                                    <h4>Last score</h4>
                                    <p>35%</p>
                                </div>
                                <div className='column_scores'>
                                    <h4>Average score</h4>
                                    <p>{averageScore ? averageScore.toFixed(1) : 0}%</p>
                                </div>
                            </div>
                            <div className='buttonsHome'>
                                <div className='startGame'><Link onClick={popUpGameMode} style={{ color: 'white', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='btnStartHome'>Start</Link></div>
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
                            <div className='text_secon_page' style={{ zIndex: "1000" }}>
                                <p className='second_page_title'>How is your <br /> <span className='memory_style'>memory</span> working?</p>
                                <p className='second_page_subtitle'>Lorem ipsum, dolor sit amet. Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.Lorem ipsum, dolor sit amet.</p>
                                <button onClick={popUpGameMode} className='startGameLanding'>Start playing</button>
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