import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { resetReducer } from '../../redux/action'
import axios from 'axios';
import Cookie from 'universal-cookie'
import logoTekal from '../Styles/tekalLogo.png';
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

function Finalgame({ history }) {

    const dispatch = useDispatch()
    const { score } = useSelector(state => state.user.currentGame)
    const cookies = new Cookie();
    var emailCokkie;
    //Sacando el email
    if (cookies.get('userInfo')) {
        if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
        else { emailCokkie = cookies.get('userInfo').Items[0].email }
    }

    const holaa = localStorage.getItem('pruebaa')
    const resultadoparaenviar = JSON.parse(holaa)
    console.log(resultadoparaenviar)
    if (resultadoparaenviar) {
        resultadoparaenviar.shift()
        resultadoparaenviar.unshift(emailCokkie)
    }
    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: false,
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
    const postDataa = async () => {
        await axios.post('http://localhost:3001/videoInfo', resultadoparaenviar)
        await axios.post('http://localhost:3001/gameInfo', resultadoparaenviar)
    }
    postDataa()

    /* Cambio de idioma */

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));
    const lang = language;
  
    counterpart.registerTranslations('en',en);
    counterpart.registerTranslations('es',es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    return (
        <div>
            <div className='bgLandingfinal'>

             <img  className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />

            <div className='containerDataFinalPage'>
            <div className='finalPageColumnLeft'>
            <h1 className='yourscore'>{<Translate content="tituloLastScreen" component="span"/>}</h1>
            <div className="grafico">
                <Line data={data} options={opciones} config={config} />
            </div>
            <p className='textLastScreen'>{<Translate content="textoLastScreen" component="span"/>}</p>
            <div className='buttonRegister2'>
                <Link to='/'>
                    <button className='buttonRegister' >Home</button>
                </Link>
                <button className='buttonRegister' onClick={again}>{<Translate content="intentarNuevamente" component="span"/>}</button>
            </div>
            </div>

            <div className='finalPageColumnRight'>
                {/* <h1 className="porcentaje">{targetFound && targetFound.points === 0 ? 0 : score === Number ? score : 0}%</h1> */}
                <div className='containerResultFinalPage'>
                <h1>{<Translate content="tituloResultadoLastScreen" component="span"/>}</h1>
                <h2 className="porcentaje">{localStorage.getItem('score') === 0 ? localStorage.getItem('score').toFixed() : localStorage.getItem('score')}%</h2>  
                <p>{<Translate content="textoResultadoLastScreen" component="span"/>}</p>
                </div>
                <button className='share'>{<Translate content="compartir" component="span"/>}</button>
            </div>

            </div>
            </div>
        </div>
    )
}

export default withRouter(Finalgame)