import React, { useState, useEffect } from 'react';
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

const GameModes = () => {

    const [login, setLogin] = useState(false)
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
        window.location.href = ('/game')
        MySwal.clickConfirm()
    }

    const moodFunction = (e) => {
        if (e.target.id === 'video') localStorage.setItem('mode', e.target.id)
        if (e.target.id === 'image') localStorage.setItem('mode', e.target.id)
        const lastStorageDay = localStorage.getItem('date')
        const currentDate = new Date();
        const day = currentDate.getDay();
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

    const playWithOutLogin = () => {
        localStorage.setItem('mode', 'video')
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
                        <div className='game_mode'>
                            <MovieCreationIcon style={{ fontSize: '7.5rem' }} />
                            <p>{<Translate content="videosCortoPlazo" component="p" />}</p>
                            <a onClick={moodFunction} id="video">{<Translate content="seleccionar" component="a" id='video'/>}</a>
                        </div>
                        <div className='game_mode' >
                            <MovieFilterIcon style={{ fontSize: '7.5rem' }} />
                            <p>{<Translate content="videosLargoPlazo" component="p" />}</p>
                            <a onClick={moodFunction} id='video'>{<Translate content="seleccionar" component="a" />}</a>
                        </div>
                        <div className='game_mode'>
                            <ImageIcon style={{ fontSize: '7.5rem' }} />
                            <p>{<Translate content="imagenesCortoPlazo" component="p" />}</p>
                            <a onClick={moodFunction} id='image'>{<Translate content="seleccionar" component="a" id='image' />}</a>
                        </div>
                        <div className='game_mode'>
                            <BurstModeIcon style={{ fontSize: '7.5rem' }} />
                            <p>{<Translate content="imagenesLargoPlazo" component="p" />}</p>
                            <a onClick={moodFunction} id='image'>{<Translate content="seleccionar" component="a" />}</a>
                        </div>
                    </div>
                </div>
                :
                <div className='container_game_modes'>
                    <div className='subContainer_game_modes_unlock'>
                        <div className='game_mode'>
                            <MovieCreationIcon style={{ fontSize: '7.5rem' }} />
                            <p>{<Translate content="videosCortoPlazo" component="p" />}</p>
                            <a onClick={playWithOutLogin} id='video'>{<Translate content="seleccionar" component="a" />}</a>
                        </div>
                        <div className='game_mode_gray'>
                            <MovieFilterIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>{<Translate content="videosLargoPlazo" component="p" />}</p>
                            <a>{<Translate content="seleccionar" component="a" />}</a>
                            <p className='unlock'>{<Translate className='unlock'  content="logeateParaDesbloquear" component="p" />}</p>
                        </div>
                        <div className='game_mode_gray'>
                            <ImageIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>{<Translate content="imagenesCortoPlazo" component="p" />}</p>
                            <a>{<Translate content="seleccionar" component="a" />}</a>
                            <p className='unlock'>{<Translate className='unlock' content="logeateParaDesbloquear" component="p" />}</p>
                        </div>
                        <div className='game_mode_gray'>
                            <BurstModeIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>{<Translate content="imagenesLargoPlazo" component="p" />}</p>
                            <a >{<Translate content="seleccionar" component="a" />}</a>
                            <p className='unlock'>{<Translate className='unlock' content="logeateParaDesbloquear" component="p" />}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default GameModes