
import { useState, useEffect, useRef } from 'react';
import '../Styles/GameModes.css';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import MovieFilterIcon from '@material-ui/icons/MovieFilter'; //estrellas
import ImageIcon from '@material-ui/icons/Image';
import BurstModeIcon from '@material-ui/icons/BurstMode'; //long
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookie from 'universal-cookie'
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"
import Timer from 'react-compound-timer/build';
import Countdown from 'react-countdown';

const GameModes = () => {
    const [resetLongTerm, setResetLongTerm] = useState()
    const mode = localStorage.getItem('mode')
    const longTermActive = localStorage.getItem('longTermActive') // Habilita a jugar el longTerm
    console.log(Date.now())
    useEffect(() => {
        if (mode.includes('-')) {
            const playedLongTerm = Number(localStorage.getItem('playedDate'))
            setResetLongTerm(playedLongTerm)
        }
    }, [])
    const reset = () => {
        localStorage.removeItem('playedDate')
        setResetLongTerm('')
    }
    //----------------------------------------
    const [login, setLogin] = useState(false)

    const MySwal = withReactContent(Swal)
    const cookies = new Cookie();
    const t = useRef()
    useEffect(() => {
        if (cookies.get('userInfo')) {
            setLogin(true)
        }
    }, [])

    const mood2 = (e) => {
        const currentDate = new Date();
        const day = currentDate.getDay();
        localStorage.setItem('mood', e.target.id)
        localStorage.setItem('date', day)
        window.location.href = ('/game')
        MySwal.clickConfirm()
    }

    const moodFunction = (e) => {
        /*  if (e.target.id.includes('-')) {
             if (e.target.id === mode) return null
             else localStorage.setItem('longTerm', e.target.id)
         } */
        console.log(e.target.id)
        localStorage.setItem('mode', e.target.id)
        const lastStorageDay = localStorage.getItem('date')
        const currentDate = new Date();
        const day = currentDate.getDay();
        cookies.remove('play') // deja volver a jugar
        if (lastStorageDay != day) {
            MySwal.fire({
                title: <h3>{<Translate content="estadoDeAnimo" component="h3" />}</h3>,
                html:
                    <div className='mood_container' style={{ borderStyle: 'none' }}>
                        <span id='fine' onClick={mood2}>😁</span>
                        <span id='normal' onClick={mood2}>😐</span>
                        <span id='bad' onClick={mood2}>☹️</span>
                    </div>,
                showConfirmButton: false,

            })
        } else {
            window.location.href = ('/game')
        }
    }

    const playWithOutLogin = (e) => {
        cookies.remove('play')
        localStorage.setItem('mode', e.target.id)
        window.location.href = ('/game')
    
    }

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    return (
        <>
            {login ?
                <div className='container_game_modes'>
                <div className='subContainer_game_modes'>
                    <button onClick={moodFunction} id="video">
                        <div className='game_mode' id="video">
                            <MovieCreationIcon style={{ fontSize: '7.5rem' }} id="video" />
                            <p id="video">{<Translate content="videosCortoPlazo" component="p" id="video" />}</p>
                        </div>
                    </button>
                    <button onClick={moodFunction} id='image'>
                        <div className='game_mode' id='image'>
                            <ImageIcon style={{ fontSize: '7.5rem' }} id='image' />
                            <p id='image'>{<Translate content="imagenesCortoPlazo" component="p" id='image' />}</p>
                        </div>
                    </button>
                    <button onClick={moodFunction} id='video-lt'>
                        <div className='game_mode' id='video-lt'>
                            <MovieFilterIcon style={{ fontSize: '7.5rem' }} id='video-lt' />
                            {mode === 'video-lt' && resetLongTerm ?
                                <p><Countdown date={resetLongTerm + 86400000} onComplete={reset}  /></p> :
                                longTermActive ? <p id='video'>{<Translate content="videosLargoPlazo" component="p" id='video-lt' />}</p> :
                                    <p>Finish a short term first</p>
                            }
                        </div>
                    </button>
                    <button onClick={moodFunction} id='image-lt'>
                        <div className='game_mode' id='image-lt'>
                            <BurstModeIcon style={{ fontSize: '7.5rem' }} id='image-lt' />
                            {mode === 'image-lt' && resetLongTerm ? <p><Countdown date={resetLongTerm + 5000} onComplete={reset} /></p> :
                                longTermActive ? <p id='image'>{<Translate content="imagenesLargoPlazo" component="p" id='image-lt' />}</p> :
                                    <p>Finish a short term first</p>
                            }
                        </div>
                    </button>
                </div>
            </div>
                :
                <div className='container_game_modes'>
                    <div className='subContainer_game_modes_unlock' >
                        <button onClick={(e) => console.log(e.target.id)} id='video'>
                            <div className='game_mode'>
                                <MovieCreationIcon style={{ fontSize: '7.5rem' }}/>
                                <p>{<Translate content="videosCortoPlazo" component="p"/>}</p>
                            </div>
                        </button>
                        <button onClick={(e) => playWithOutLogin(e)} id='image'>
                            <div className='game_mode' id='image'>
                                <ImageIcon style={{ fontSize: '7.5rem' }} id='image' />
                                <p id='image'>{<Translate content="imagenesCortoPlazo" component="p" id='image' />}</p>
                            </div>
                        </button>
                        <div className='game_mode_gray'>
                            <MovieFilterIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>{<Translate content="videosLargoPlazo" component="p" />}</p>
                            <p className='unlock'>{<Translate className='unlock' content="logeateParaDesbloquear" component="p" />}</p>
                        </div>
                        <div className='game_mode_gray'>
                            <BurstModeIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>{<Translate content="imagenesLargoPlazo" component="p" />}</p>
                            <p className='unlock'>{<Translate className='unlock' content="logeateParaDesbloquear" component="p" />}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default GameModes