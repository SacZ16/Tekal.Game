import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import Particles from 'react-particles-js'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
// import swal from '@sweetalert/with-react'
import { resetReducer } from '../../redux/action'

function Finalgame({ history }) {

    const dispatch = useDispatch()

    const { score } = useSelector(state => state.user.currentGame)
    console.log(score)
    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Last 5 sessions',
            fill: false,
            borderColor: '#1663A2',
            borderWidth: 6,
            data: ['60', '43', '1', '80', score]
        }]
    }
    const opciones = {
        maintainAspectRatio: false,
        responsive: true,
    }
    const config = {
        type: 'line',
        data: data,
    };

    const again = () => {
        dispatch(resetReducer())
        history.push('/game')
    }


    return (
        <div>
            <div className='bgLandingfinal'>
                <Particles
                    params={{ 'particles': { "number": { "value": 96, "density": { "enable": true, "value_area": 800 } } }, 'line_linked': { 'width': '2' }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" } } } }}
                />
            </div>
            <h1 className='yourscore'>Your score is</h1>
            <div className='marco'>
                {/* <h1 className="porcentaje">{targetFound && targetFound.points === 0 ? 0 : score === Number ? score : 0}%</h1> */}
                <h1 className="porcentaje">{score === 0 ? score.toFixed() : score}%</h1>
                <div className='loader'>
                </div>
            </div>
            <div className="grafico">
                <Line data={data} options={opciones} config={config} />
            </div>
            <div className='buttonRegister2' >
                <div>
                    <Link to='/'>
                        <button className='buttonRegister' >Home</button>
                    </Link>
                </div>
                <div>

                    <button className='buttonRegister' onClick={again}>Try again</button>

                </div>
            </div>
            <p className='copyright'>Â© 2021 Tekal, Inc. All rights reserved</p>
        </div >
    )
}

export default withRouter(Finalgame)