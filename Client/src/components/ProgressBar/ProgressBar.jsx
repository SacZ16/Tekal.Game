import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Styles/Game.module.css';
import '../Styles/progressBar.css';

function ProgressBar({ lives, max, progress }) {
    return (
        <div style={{ width: '90%', marginTop: '-30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={style.vidasgame} style=
                {{
                    color: 'red', display: 'flex', flexDirection: 'row',
                }}>❤ x {lives}
            </div>

            <progress
                className='progressBar'
                id="progress"
                max={max}
                value={progress}
            >
            </progress>
            <Link className={style.xgame} style={{ marginLeft: '40px', marginTop: '-10px', color: 'white', textDecoration: 'none' }} to='/'>
                ✖
            </Link>
        </div>
    )
}

export default ProgressBar
