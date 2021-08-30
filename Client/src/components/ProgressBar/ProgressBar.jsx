import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Styles/Game.module.css';
import '../Styles/progressBar.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteIcon from '@material-ui/icons/Favorite';


function ProgressBar({ lives, max, progress }) {
    return (
        <div style={{ width: '90%', marginTop: '-30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={style.vidasgame} style=
                {{
                    color: 'white', display: 'flex', flexDirection: 'row', fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 'bold'
                }}><FavoriteIcon style={{ fontSize: '20px' }} /> x {lives > 0 ? lives : 0}
            </div>

            <progress
                id="progress"
                max={max}
                value={progress}
            >
            </progress>

            <Link className={style.xgame} to='/'>
                <HighlightOffIcon style={{ marginLeft: '70px', marginBottom: '1%', color: 'white', textDecoration: 'none', fontSize: '25px' }} />
            </Link>
        </div>
    )
}

export default ProgressBar
