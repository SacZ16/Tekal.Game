import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/progressBar.css';

function ProgressBar({ lives, max, progress }) {
    return (
        <div style={{ width: '90%', margin: '0', display: 'flex' }}>
            {
                lives === 3 ?
                    <div style=
                        {{
                            color: 'red', display: 'flex', flexDirection: 'row',
                            width: '70px', marginTop: '-30px'
                        }}>❤ ❤ ❤
                    </div> : null
            }
            {
                lives === 2 ?
                    <div style=
                        {{
                            color: 'red', display: 'flex', flexDirection: 'row',
                            width: '70px', marginTop: '-30px'
                        }}>❤ ❤ 💔
                    </div> : null
            }
            {
                lives === 1 ?
                    <div style=
                        {{
                            color: 'red', display: 'flex', flexDirection: 'row',
                            width: '70px', marginTop: '-30px'
                        }}>❤ 💔 💔
                    </div> : null
            }
            {
                lives === 0 ?
                    <div style=
                        {{
                            color: 'red', display: 'flex', flexDirection: 'row',
                            width: '70px', marginTop: '-30px'
                        }}>💔 💔 💔
                    </div> : null
            }
            <progress
                className='progressBar'
                id="progress" max={max}
                value={progress}>
            </progress>
            <Link style={{ marginLeft: '40px', marginTop: '-37px', color: 'white', fontSize: '25px', textDecoration: 'none' }} to='login'>
                x
            </Link>
        </div>
    )
}

export default ProgressBar
