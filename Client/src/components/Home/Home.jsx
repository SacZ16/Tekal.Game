import React, { useState} from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainBottomLeft from '../Styles/images/brainBottomLeft.png';
import brainBottomRight from '../Styles/images/brainBottomRight.png';
import cerebritoHomeResults from '../Styles/prefinalmascota.png';
import Cookie from 'universal-cookie';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import RegisterWithEmail from '../Signin/RegisterEmail';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import cerebritoDerecha from '../Styles/cerebrito_derecha.png'
import withReactContent from 'sweetalert2-react-content'
import { SendDataToBACK } from '../controllers/dbFunctions'
import MenuIcon from '@material-ui/icons/Menu';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GameModes from '../GameModes/GameModes';
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"
import '../Styles/home.css';

const Home = () => {
    const MySwal = withReactContent(Swal)
    const [offset, setOffset] = useState()
   
    const handleScroll = () => {
        setOffset(window.pageYOffset)
    }
    if (localStorage.getItem('pruebaa')) { localStorage.removeItem('pruebaa') }
    window.addEventListener('scroll', handleScroll)
    const prueba = () => {
        MySwal.fire({
            title: <p style={{color:'white', marginBottom:0, fontFamily:'Montserrat, sans-serif'}}>{<Translate content="botonLogin" component="span"/>}</p>,
            html:
                <div style={{overflow:'hidden'}}>
                <RegisterCommonForm props={SendDataToBACK} style={{posicion:'absolute'}}/>
                <div style={{display:'flex'}}>
                <a className='signUpText'>{<Translate content="noTienesUnaCuenta" component="span"/>}&nbsp;</a><a style={{background:'none', marginTop:'15px', color:'white', fontFamily:'Montserrat, sans-serif', fontSize:'14px'}} onClick={pruebare}>{<Translate content="botonRegistro" component="span"/>}</a>
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
            title: <p style={{color:'white', marginBottom:0, fontFamily:'Montserrat, sans-serif'}}>{<Translate content="botonRegistro" component="span"/>}</p>,
            html:
                <div style={{overflow:'hidden'}}>
                <RegisterWithEmail style={{posicion:'absolute'}}/>
                <div style={{display:'flex'}}>
                <a className='signUpText'>{<Translate content="yaTienesUnaCuenta" component="span"/>}&nbsp;</a><a style={{background:'none', marginTop:'15px', color:'white', fontFamily:'Montserrat, sans-serif', fontSize:'14px'}} onClick={prueba}>{<Translate content="botonLogin" component="span"/>}</a>
                </div>
                </div>
                ,
                showCloseButton:true,
                showConfirmButton:false
        })
    }

    const popUpGameMode = () => {
        MySwal.fire({
            html:
                <div>
                    <GameModes/>
                </div>
                ,
                showCloseButton:true,
                showConfirmButton:false
        })
    }

    const [show, setShow] = useState(false)
    const [sessionOn, setSessionOn] = useState(false) 
    const [login, setLogin] = useState(true) 
    const [startGame, setStartGame] = useState(false) 
    const [checker, setchecker] = useState(false)
    const [showMobileLogOut, setShowMobileLogOut] = useState(false)
    
    const cookies = new Cookie();

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
                             <img  className='profilePic' src='https://clinicacontraadicciones.mx/wp-content/uploads/2020/10/TESTIMONIO.jpg' alt='profile_pic' />
                            <div className='textBox'>
                                <p className='sessionName'>Maximiliano</p>
                                <p className='sessionStatus'>{<Translate content="estadoSesion" component="span"/>}</p>
                            </div>
                            <button className='btnOpenSessionMenu' onClick={e => { setShow(!show) }}>&#9660;</button>
                        </div>
                        {show ?
                            <button className='btnLogOut' onClick={() => {
                                cookies.remove('userInfo')
                                window.location.href = ('')
                            }}>{<Translate content="desloguear" component="span"/>}</button> : (null)
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
        if (lastStorageDay !== day) {
            MySwal.fire({
                title: <div className='mood_container' style={{ borderStyle: 'none'}}>
                    <h3>{<Translate content="estadoDeAnimo" component="h3"/>}</h3>
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

    var lnks = Array.from(document.getElementsByTagName('a'));

    lnks.forEach(function (v) {
    if (/#[a-z,0-9]+/.test(v.hash))
    v.addEventListener("click", animScroll, false)
    })


   /*  Boton de scroll landing page */
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

        /* Cambio de idioma */
        if(!localStorage.getItem('idioma')){
            localStorage.setItem('idioma', 'es')
        }

        const handleChange = (e) => {
            localStorage.setItem('idioma', `${e.target.value}`)
            setLanguage(localStorage.getItem('idioma'))
        }

        const [language, setLanguage] = useState(localStorage.getItem('idioma'));
        
        const lang = language;
      
        counterpart.registerTranslations('en',en);
        counterpart.registerTranslations('es',es);
        counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    return (
        <>
        <select className="Header-lang" value={lang} onChange={handleChange}>
            <option value="es">Es</option>
            <option value="en">En</option>
        </select>

        {/* No logeado mobile */}
        {login?
        <div className="pantallamovil">
            <div className="contenedortextomovil">
                <p className='subtitlemovil'>{<Translate content="titleLandingSecondPage" component="span"/>}</p>
                <div className='startGameLandingMobile'><Link to='/game' style={{ color: 'white', fontSize: '40px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', position:'relative', top:'15%', left:'1.9%'}} id='btnStartHome'><PlayArrowIcon style={{fontSize:'50px'}}/></Link></div>
            </div>
        </div>:(null)
        }

        {/* Logeado Mobile */}
        {startGame? 
            <div className="pantallaMovilScore">
            <div className="contenedorTextoMovilScore">
            <div>
               <MenuIcon className='menuMobile' onClick={() => {setShowMobileLogOut(!showMobileLogOut)}} style={{color:'white', fontSize:'30px'}}/>
               {showMobileLogOut?
                <button className='logOutMobile' onClick={() => {
                    cookies.remove('userInfo')
                    window.location.href = ('')
                }}>{<Translate content="desloguear" component="span"/>}</button>:null
               }
            </div>
            <p className='textHomeSession'>{<Translate content="bienvenidaHome" component="span"/>}&nbsp; <span className='memory_style'>Maximiliano</span></p>
            <div className='scores_mobile'>
                <div className='column_scores_mobile'>
                    <h4>{<Translate content="ultimoResultado" component="span"/>}</h4>
                    <p>35%</p>
                </div>
                <div className='column_scores_mobile'>
                    <h4>{<Translate content="promedioResultados" component="span"/>}</h4>
                    <p>68%</p>
                </div>
            </div>
                <div className='startGameLandingMobile'><Link to='/game' style={{ color: 'white', fontSize: '40px', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', position:'relative', top:'15%', left:'1.9%'}} id='btnStartHome'><PlayArrowIcon style={{fontSize:'50px'}}/></Link></div>
            </div>
        </div>:(null)
        }
        {/* Home no mobile */}
            <div className='homeDiv'>
                <section>
                     <img  className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />
                    {/* Home Logeado */}
                    {startGame ?
                        <>
                         <img  className='cerebritoHomeResults' src={cerebritoHomeResults} alt="imagen_mascota"/>
                            <p className='textHomeSession'>{<Translate content="bienvenidaHome" component="span"/>}&nbsp; <span className='memory_style'>Maximiliano</span></p>
                            <div className='scores'>
                                <div className='column_scores'>
                                    <h4>{<Translate content="ultimoResultado" component="span"/>}</h4>
                                    <p>35%</p>
                                </div>
                                <div className='column_scores'>
                                    <h4>{<Translate content="promedioResultados" component="span"/>}</h4>
                                    <p>68%</p>
                                </div>
                            </div>
                            <div className='buttonsHome'>
                            <div className='startGame'><Link onClick={mood} style={{ color: 'white', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='btnStartHome'>{<Translate content="botonJugar" component="span"/>}</Link></div>
                            </div>
                        </> : (null)}
                </section>

                <CurrentSession /> {/* Componente sesión activa */}

                {/* Home no logeado */}
                {login ?
                <>
                    <img  className='stars' src={stars} alt="starsBackground" id='stars' style={{ left: (0 + offset * 0.1) + '%' }} />
                        <p className='textHome' style={{ opacity: (100 + offset * -0.15) + '%', bottom: (50 + offset * -0.1) + '%' }}>{<Translate content="tituloLandingPage" component="span"/>}<span className='memory_style'>{<Translate content="memoria" component="span"/>}</span>?</p>
                        <p className='sub_textHome' style={{ opacity: (100 + offset * -9) + '%', bottom: (45 + offset * -0.1) + '%' }}>{<Translate content="subtituloLandingPage" component="span"/>}</p>
                    <div className='container_buttons_home'>
                        <button className='registerHome' onClick={pruebare}>{<Translate content="botonRegistro" component="span"/>}</button>
                        <button className='loginHome' onClick={prueba}>{<Translate content="botonLogin" component="span"/>}</button>
                    </div>
                        
                        <a href='#second_screen' className='button_scroll' style={{ opacity: (100 + offset * -5) + '%' }}><span></span></a>
                        <img  className='brainsBottom' src={brainBottomLeft} alt="brainsBackground" id='brainsBottomLeft' style={{ left: (-1 + offset * -0.1) + '%', bottom: (-7) }} />
                        <img  className='brainsBottom' src={brainBottomRight} alt="brainsBackground" id='brainsBottomRight' style={{ right: (0 + offset * -0.1) + '%' }} />
                    
                    <div className='second_screen_home' id='second_screen'>
                        <button className='auxiliarFondo'></button> 
                        <button className='auxiliarFondoDerecha'></button>
                    <div className='text_secon_page' style={{zIndex: "1000"}}>
                        <p className='second_page_title'>{<Translate content="bienvenidaHome" component="span"/>}</p>
                        <p className='second_page_subtitle'>{<Translate content="subTitleLandingSecondPage" component="span"/>}</p>
                        <button  onClick={popUpGameMode} className='startGameLanding'>{<Translate content="botonPlayLanding" component="span"/>}</button>
                    </div>
                        <img  className='brain_right' src={cerebritoDerecha} alt="brain" id='brain' style={{left: (67 + offset * -0.1) + '%' }} />
                    </div>
                    </>
                    : (null)}
            </div>        
        </>
    )
};

export default Home;