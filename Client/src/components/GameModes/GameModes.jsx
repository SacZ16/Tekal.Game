import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
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


    return (
        <>
            {login ?
                <div className='container_game_modes'>
                    <div className='subContainer_game_modes'>
                        <div className='game_mode'>
                            <MovieCreationIcon style={{ fontSize: '7.5rem' }} />
                            <p>Video short term</p>
                            <a onClick={moodFunction} id='video'>Videos</a>
                        </div>
                        <div className='game_mode' >
                            <MovieFilterIcon style={{ fontSize: '7.5rem' }} />
                            <p>Video long term</p>
                            <a onClick={moodFunction} id='image'>Images</a>
                        </div>
                        <div className='game_mode'>
                            <ImageIcon style={{ fontSize: '7.5rem' }} />
                            <p>Images short term</p>
                            <a onClick={moodFunction}>Select</a>
                        </div>
                        <div className='game_mode'>
                            <BurstModeIcon style={{ fontSize: '7.5rem' }} />
                            <p>Images long term</p>
                            <a onClick={moodFunction}>Select</a>
                        </div>
                    </div>
                </div>
                :
                <div className='container_game_modes'>
                    <div className='subContainer_game_modes_unlock'>
                        <div className='game_mode'>
                            <MovieCreationIcon style={{ fontSize: '7.5rem' }} />
                            <p>Video short term</p>
                            <a onClick={playWithOutLogin}>Videos</a>
                        </div>
                        <div className='game_mode_gray'>
                            <MovieFilterIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>Video long term</p>
                            <a>Images</a>
                            <p className='unlock'>Log in to unlock this mode</p>
                        </div>
                        <div className='game_mode_gray'>
                            <ImageIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>Images short term</p>
                            <a>Select</a>
                            <p className='unlock'>Log in to unlock this mode</p>
                        </div>
                        <div className='game_mode_gray'>
                            <BurstModeIcon style={{ fontSize: '7.5rem', color: 'lightgray' }} />
                            <p>Images long term</p>
                            <a >Select</a>
                            <p className='unlock'>Log in to unlock this mode</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default GameModes