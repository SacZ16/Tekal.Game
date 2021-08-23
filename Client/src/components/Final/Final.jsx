import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { resetReducer } from '../../redux/action'
import axios from 'axios';
import Cookie from 'universal-cookie'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import cerebroLose from '../Styles/slideSeisEsp.png'


function Finalgame({ history }) {

    const MySwal = withReactContent(Swal)


    const dispatch = useDispatch()
    const { score } = useSelector(state => state.user.currentGame)

    const cookies = new Cookie();
    var emailCokkie;
    //Sacando el email
    if (cookies.get('userInfo')) {
        if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
        else { emailCokkie = cookies.get('userInfo').Items[0].email }
    }

    const results = localStorage.getItem('results')
    const resultadoparaenviar = JSON.parse(results)
    console.log(resultadoparaenviar)
    if (resultadoparaenviar) {
        resultadoparaenviar.shift()
        resultadoparaenviar.unshift(emailCokkie)
    }
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
        MySwal.fire({
            toast: true,
            html:
                <div >
                    <h1 style={{ color: 'red', textAlign: 'center' }}>Lost all your lives, good luck next time</h1>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', paddingBottom: '100px' }}>
                        <img src={cerebroLose} alt="" style={{ width: '20vh', height: '20vh', backgroundColor:'yellow', padding: '0' }} />
                    </div>
                </div>,
            // timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true,
            width: 500
        })
        /*   dispatch(resetReducer())
          history.push('/game') */
    }

    useEffect(() => {
        /*       postDataa() */
    }, [])

    const postDataa = async () => {
        await axios.post('http://localhost:3001/videoInfo', resultadoparaenviar)
        await axios.post('http://localhost:3001/gameInfo', resultadoparaenviar)
        localStorage.removeItem('score')
        localStorage.removeItem('results')
    }

    return (
        <div className='fondopreclose' >

            <div>
                <h1 className='yourscore'>Your score is</h1>
                <div className='marco'>
                    {/* <h1 className="porcentaje">{targetFound && targetFound.points === 0 ? 0 : score === Number ? score : 0}%</h1> */}
                    <h1 className="porcentaje">{localStorage.getItem('score') === 0 ? localStorage.getItem('score').toFixed() : localStorage.getItem('score')}%</h1>
                    <div className='loader'></div>
                </div>
                <div className='buttonRegister2' >
                    <div>
                        <Link to='/'>
                            <button className='botnreclose' >Home</button>
                        </Link>
                    </div>
                    <div>
                        <button className='botnreclose' onClick={again}>Try again</button>
                    </div>
                </div>
            </div>
            <div className="grafico">
                <Line data={data} options={opciones} config={config} />
            </div>

            <p className='copyright'>Â© 2021 Tekal, Inc. All rights reserved</p>
        </div >
    )
}

export default withRouter(Finalgame)