import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import '../Styles/GameModes.css';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import MovieFilterIcon from '@material-ui/icons/MovieFilter'; //estrellas
import ImageIcon from '@material-ui/icons/Image';
import BurstModeIcon from '@material-ui/icons/BurstMode'; //long

const GameModes = () => {

    const [login, setLogin] = useState(true)

   return (
    <>
    {login?
    <div className='container_game_modes'> 
        <div className='subContainer_game_modes'>
        <div className='game_mode'>
            <MovieCreationIcon style={{fontSize:'7.5rem'}}/>
            <p>Video short term</p>
            <a href='/game'>Select</a>
        </div>
        <div className='game_mode' >
            <MovieFilterIcon style={{fontSize:'7.5rem'}}/>
            <p>Video long term</p>
            <a href='/game'>Select</a>
        </div>
        <div className='game_mode'>
            <ImageIcon style={{fontSize:'7.5rem'}}/>
            <p>Images short term</p>
            <a href='/game'>Select</a>
        </div>
        <div className='game_mode'>
            <BurstModeIcon style={{fontSize:'7.5rem'}}/>
            <p>Images long term</p>
            <a href='/game'>Select</a>
        </div>
        </div>
    </div>
    :
    <div className='container_game_modes'> 
    <div className='subContainer_game_modes_unlock'>
        <div className='game_mode'>
            <MovieCreationIcon style={{fontSize:'7.5rem'}}/>
            <p>Video short term</p>
            <a href='/game'>Select</a>
        </div>
        <div className='game_mode_gray'>
            <MovieFilterIcon style={{fontSize:'7.5rem', color:'lightgray'}}/>
            <p>Video long term</p>
            <a href=''>Select</a>
            <p className='unlock'>Log in to unlock this mode</p>
        </div>
        <div className='game_mode_gray'>
            <ImageIcon style={{fontSize:'7.5rem', color:'lightgray'}}/>
            <p>Images short term</p>
            <a href=''>Select</a>
            <p className='unlock'>Log in to unlock this mode</p>
        </div>
        <div className='game_mode_gray'>
            <BurstModeIcon style={{fontSize:'7.5rem', color:'lightgray'}}/>
            <p>Images long term</p>
            <a href=''>Select</a>
            <p className='unlock'>Log in to unlock this mode</p>
        </div>
        </div> 
    </div>
    }
    </>
   )
};

export default GameModes