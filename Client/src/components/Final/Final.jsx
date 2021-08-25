import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import { Line } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { resetReducer } from '../../redux/action'
import axios from 'axios';
import Cookie from 'universal-cookie'
import logoTekal from '../Styles/tekalLogo.png';

// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

function Finalgame({ history }) {
    const dispatch = useDispatch()
    const cookies = new Cookie();
    const [sessionData, setSessionData] = useState({
        score: 0,
        totalTargets: 0
    })
    const { score, totalTargets } = sessionData
    useEffect(() => {
        if (cookies.get('sessionData')) {
            setSessionData({ ...sessionData, score: cookies.get('sessionData').score })
            setSessionData({ ...sessionData, totalTargets: cookies.get('sessionData').totalTargets })
            // const totalTargets = cookies.get('sessionData').totalTargets
        } else {
            history.push('/')
        }
    }, [])

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
        cookies.remove('sessionData')
        dispatch(resetReducer())
        history.push('/game')
    }

    useEffect(() => {
        /* postDataa() */
    }, [])

    const postDataa = async () => {
        await axios.post('http://localhost:3001/videoInfo', resultadoparaenviar)
        await axios.post('http://localhost:3001/sessionData', resultadoparaenviar)
        localStorage.removeItem('results')
    }

    /* Cambio de idioma */

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));
    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */



    return (
        <div>
            <div className='bgLandingfinal'>

                <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />

                <div className='containerDataFinalPage'>
                    <div className='finalPageColumnLeft'>
                        <h1 className='yourscore'>{<Translate content="tituloLastScreen" component="span" />}</h1>
                        <div className="grafico">
                            <Line data={data} options={opciones} config={config} />
                        </div>
                        <p className='textLastScreen'>{<Translate content="textoLastScreen" component="span" />}</p>
                        <div className='buttonRegister2'>
                            <Link to='/'>
                                <button className='buttonRegisterFinal' >{<Translate content="home" component="span" />}</button>
                            </Link>
                            <button className='buttonRegisterFinal' onClick={again}>{<Translate content="intentarNuevamente" component="span" />}</button>
                        </div>
                    </div>

                    <div className='finalPageColumnRight'>
                        {/* <h1 className="porcentaje">{targetFound && targetFound.points === 0 ? 0 : score === Number ? score : 0}%</h1> */}
                        <div className='containerResultFinalPage'>
                            <h1>{<Translate content="tituloResultadoLastScreen" component="span" />}</h1>
                            <h2 className="porcentaje">{score === 0 ? score.toFixed() : score.toFixed(2)}%</h2>
                            <p>{<Translate content="textoResultadoLastScreen" component="span" />}</p>
                            {/* <p>Identificaste {score} de los {totalTargets} videos target repetidos en el juego.</p> */}
                        </div>
                        <button className='share'>{<Translate content="compartir" component="span" />}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default withRouter(Finalgame)