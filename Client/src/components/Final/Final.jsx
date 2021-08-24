import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { resetReducer } from '../../redux/action'
import axios from 'axios';
import Cookie from 'universal-cookie'
import logoTekal from '../Styles/tekalLogo.png';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
        dispatch(resetReducer())
        history.push('/game')
    }

    useEffect(() => {
        /* postDataa() */
    }, [])

    const postDataa = async () => {
        await axios.post('http://localhost:3001/videoInfo', resultadoparaenviar)
        await axios.post('http://localhost:3001/gameInfo', resultadoparaenviar)
        localStorage.removeItem('score')
        localStorage.removeItem('results')
    }

    return (
        <div>
            <div className='bgLandingfinal'>

                <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />

                <div className='containerDataFinalPage'>
                    <div className='finalPageColumnLeft'>
                        <h1 className='yourscore'>You are among the 30% of the people your age with highest memory! </h1>
                        <div className="grafico">
                            <Line data={data} options={opciones} config={config} />
                        </div>
                        <div className='buttonRegister2'>
                            <Link to='/'>
                                <button className='buttonRegister' >Home</button>
                            </Link>
                            <button className='buttonRegister' onClick={again}>Try again</button>
                        </div>
                    </div>

                    <div className='finalPageColumnRight'>
                        {/* <h1 className="porcentaje">{targetFound && targetFound.points === 0 ? 0 : score === Number ? score : 0}%</h1> */}
                        <div className='containerResultFinalPage'>
                            <h1>Your score</h1>
                            <h2 className="porcentaje">{localStorage.getItem('score') === 0 ? localStorage.getItem('score').toFixed() : localStorage.getItem('score')}%</h2>
                            <p>Identificaste ? de los ? videos repetidos en el juego.</p>
                        </div>
                        <button className='share'>Share</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default withRouter(Finalgame)