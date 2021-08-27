import { useState, useEffect } from 'react';
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
import Countdown from 'react-countdown';

const GameModes = ({ averageScore }) => {

    const [resetLongTermVideo, setResetLongTermVideo] = useState()
    const [resetLongTermImage, setResetLongTermImage] = useState()
    const modeVideoLT = localStorage.getItem('video-lt')
    const modeImageLT = localStorage.getItem('image-lt')
    const longTermVideoActive = localStorage.getItem('longTermVideoActive') // Habilita a jugar el longTerm
    const longTermImageActive = localStorage.getItem('longTermImageActive') // Habilita a jugar el longTerm
    useEffect(() => {
        const playedLongTermVideo = localStorage.getItem('playedDateVideo') // Fecha en la que se jugo el ultimo juego Long Term
        const playedLongTermImage = localStorage.getItem('playedDateImage') // Fecha en la que se jugo el ultimo juego Long Term
        setResetLongTermVideo(Number(playedLongTermVideo))
        setResetLongTermImage(Number(playedLongTermImage))
    }, [])
    const resetVid = () => {
        localStorage.setItem('longTermToPlay', 'longTermToPlay')
        localStorage.removeItem('playedDateVideo')
        setResetLongTermVideo('')
    }
    const resetImg = () => {
        localStorage.removeItem('playedDateImage')
        setResetLongTermImage('')
    }
    //----------------------------------------
    const [login, setLogin] = useState(false)
    console.log(Date.now())
    const MySwal = withReactContent(Swal)
    const cookies = new Cookie();

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
        if (averageScore === undefined || averageScore == 0) {
            window.location.href = ('/tutorial')
        } else {
            window.location.href = ('/game')
        }
        MySwal.clickConfirm()
    }

    const moodFunctionVideo = () => {
        localStorage.setItem('mode', 'video')
        mood()
    }
    const moodFunctionVideoLT = () => {
        localStorage.setItem('mode', 'video-lt')
        mood()
    }
    const moodFunctionImage = () => {
        localStorage.setItem('mode', 'image')
        mood()
    }
    const moodFunctionImageLT = () => {
        localStorage.setItem('mode', 'image-lt')
        mood()
    }

    const mood = () => {
        const lastStorageDay = localStorage.getItem('date')
        const currentDate = new Date();
        const day = currentDate.getDay();
        cookies.remove('play') // deja volver a jugar
        if (lastStorageDay !== day) {
            MySwal.fire({
                title: <h3>{<Translate content="estadoDeAnimo" component="h3" />}</h3>,
                html:
                    <div className='mood_container' style={{ borderStyle: 'none' }}>
                        <span id='bad' onClick={mood2}>☹️</span>
                        <span id='normal' onClick={mood2}>😐</span>
                        <span id='fine' onClick={mood2}>😁</span>
                    </div>,
                showConfirmButton: false
            })
        } else {
            if (averageScore === undefined || averageScore == 0) {
                window.location.href = ('/tutorial')
            } else {
                window.location.href = ('/game')
            }
        }
    }

    const playWithOutLogin = () => {
        if (averageScore === undefined || averageScore == 0) {
            cookies.remove('play')
            localStorage.setItem('mode', 'video')
            window.location.href = ('/tutorial')
        }
    }

    const renderer = ({ hours, minutes, seconds }) => {
        return <p style={{ fontSize: '1rem' }} >{hours}:{minutes}:{seconds}</p>;
    }

    const playWithOutLogin2 = () => {
        if (averageScore === undefined || averageScore == 0) {
            cookies.remove('play')
            localStorage.setItem('mode', 'image')
            window.location.href = ('/tutorial')
        }
    }

    return (
        <>
            {login ?
                <div className='container_game_modes'>
                    <div className='subContainer_game_modes'>
                        <button onClick={moodFunctionVideo} id="video">
                            <div className='game_mode' id="video">
                                <MovieCreationIcon style={{ fontSize: '5.5rem' }} id="video" />
                                <p id="video">{<Translate content="videosCortoPlazo" component="p" id="video" />}</p>
                                <p className='descrip_game_mode'>{<Translate content="shortTermVideo" component="span" />}</p>
                            </div>
                        </button>
                        <button onClick={moodFunctionImage} id='image'>
                            <div className='game_mode' id='image'>
                                <ImageIcon style={{ fontSize: '5.5rem' }} id='image' />
                                <p id='image'>{<Translate content="imagenesCortoPlazo" component="p" id='image' />}</p>
                                <p className='descrip_game_mode'>{<Translate content="shortTermImage" component="span" />}</p>
                            </div>
                        </button>
                        <button onClick={moodFunctionVideoLT} id='video-lt' disabled={resetLongTermVideo || !longTermVideoActive ? true : false}>
                            <div className='game_mode' id='video-lt'>
                                <MovieFilterIcon style={{ fontSize: '5.5rem' }} id='video-lt' />
                                {modeVideoLT === 'video-lt' && resetLongTermVideo ?
                                    <p>{<Translate content="esperaParaJugar" id='video-lt' />}<Countdown date={resetLongTermVideo + 86400000} onComplete={resetVid} renderer={renderer} /></p> :
                                    longTermVideoActive ? <><p id='video-lt' >{<Translate content="videosLargoPlazo" component="span" id='video-lt' />}</p>
                                        <p className='descrip_game_mode'>{<Translate content="longTermVideo" component="span" />}</p></> :
                                        <p>{<Translate content="completaShortTermVid" id='video-lt' />}</p>
                                }
                            </div>
                        </button>
                        <button onClick={moodFunctionImageLT} id='image-lt' disabled={resetLongTermImage || !longTermImageActive ? true : false}>
                            <div className='game_mode' id='image-lt'>
                                <BurstModeIcon style={{ fontSize: '5.5rem' }} id='image-lt' />
                                {modeImageLT === 'image-lt' && resetLongTermImage ?
                                    <p>{<Translate content="esperaParaJugar" id='image-lt' />}<Countdown date={resetLongTermImage + 86400000} onComplete={resetImg} renderer={renderer} /></p> :
                                    longTermImageActive ? <><p id='image-lt'>{<Translate content="imagenesLargoPlazo" component="span" id='image-lt' />}</p>
                                        <p className='descrip_game_mode'>{<Translate content="longTermImages" component="span" />}</p></> :
                                        <p>{<Translate content="completaShortTermImg" id='image-lt' />}</p>

                                }
                            </div>
                        </button>
                    </div>
                </div>
                :
                <div className='container_game_modes'>
                    <div className='subContainer_game_modes_unlock' >
                        <button onClick={playWithOutLogin} id="video">
                            <div className='game_mode' id="video">
                                <MovieCreationIcon style={{ fontSize: '5.5rem' }} id="video" />
                                <p id="video">{<Translate content="videosCortoPlazo" component="p" id="video" />}</p>
                                <p className='descrip_game_mode'>{<Translate content="shortTermVideo" component="span" />}</p>
                            </div>
                        </button>
                        <button onClick={playWithOutLogin2} id='image'>
                            <div className='game_mode' id='image'>
                                <ImageIcon style={{ fontSize: '5.5rem' }} id='image' />
                                <p id='image'>{<Translate content="imagenesCortoPlazo" component="p" id='image' />}</p>
                                <p className='descrip_game_mode'>{<Translate content="shortTermImage" component="span" />}</p>
                            </div>
                        </button>
                        <div className='game_mode_gray'>
                            <MovieFilterIcon style={{ fontSize: '5.5rem', color: 'lightgray' }} />
                            <p>{<Translate content="videosLargoPlazo" component="p" />}</p>
                            <p className='unlock'>{<Translate className='unlock' content="logeateParaDesbloquear" component="p" />}</p>
                        </div>
                        <div className='game_mode_gray'>
                            <BurstModeIcon style={{ fontSize: '5.5rem', color: 'lightgray' }} />
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