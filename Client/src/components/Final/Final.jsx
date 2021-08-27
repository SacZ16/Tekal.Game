import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import '../Styles/share.css'
import { Line } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { resetReducer } from '../../redux/action'
import axios from 'axios';
import Cookie from 'universal-cookie'
import logoTekal from '../Styles/tekalLogo.png';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import graph0 from '../Styles/graph0.png'
import graph10 from '../Styles/graph10.png'
import graph20 from '../Styles/graph20.png'
import graph30 from '../Styles/graph30.png'
import graph40 from '../Styles/graph40.png'
import graph50 from '../Styles/graph50.png'
// Componentes
import Share from '../Share/Share'
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"
import Loading from '../Loading/Loading'

function Finalgame({ history }) {
    const MySwal = withReactContent(Swal)

    const dispatch = useDispatch()
    const cookies = new Cookie();
    const mode = localStorage.getItem('mode') // Toma el modo de juego

    const [sessionData, setSessionData] = useState({
        score: 0,
        scoreVisual: 0,
        videosRecognized: 0,
        totalRepeats: 0
    })
    const { scoreVisual, totalRepeats, videosRecognized } = sessionData
    const [globalScore, setGlobalScore] = useState(null)
    useEffect(() => {
        if (cookies.get('sessionData')) {
            setSessionData({
                ...sessionData,
                score: cookies.get('sessionData').score,
                scoreVisual: cookies.get('sessionData').scoreVisual,
                videosRecognized: cookies.get('sessionData').videosRecognized,
                totalRepeats: cookies.get('sessionData').totalRepeats
            })
            localStorage.setItem('lastScore', Number(cookies.get('sessionData').scoreVisual.toFixed(2)))
        } else {
            history.push('/')
        }
    }, [])

    useEffect(async () => {
        if (mode.includes('-')) {
            const mode2 = mode.slice(0, -3)
            const res = await axios.post('http://localhost:3001/globalScore', {
                score: scoreVisual,
                type: mode2
            })
            setGlobalScore(res.data.betterThan)
        } else {
            const res = await axios.post('http://localhost:3001/globalScore', {
                score: scoreVisual,
                type: mode
            })
            setGlobalScore(res.data.betterThan)
        }
    }, [sessionData])

    var emailCokkie;
    //Sacando el email
    if (cookies.get('userInfo')) {
        if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
        else { emailCokkie = cookies.get('userInfo').Items[0].email }
    }

    const results = localStorage.getItem('results')
    const resultadoparaenviar = JSON.parse(results)
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
            data: ['60', '43', '1', '80', scoreVisual]
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
        cookies.remove('play')
        dispatch(resetReducer())
        history.push('/game')
    }

    useEffect(() => {
        postDataa()
    }, [])

    const postDataa = async () => {
        await axios.post('http://localhost:3001/videoInfo', resultadoparaenviar)
        await axios.post('http://localhost:3001/gameInfo', resultadoparaenviar)
        localStorage.removeItem('results')
    }

    /* Cambio de idioma */

    const [language, _setLanguage] = useState(localStorage.getItem('idioma'));
    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    const share = () => {
        MySwal.fire({
            imageUrl: `https://www.pngall.com/wp-content/uploads/2/Share-PNG-Free-Download.png`,
            html:
                <div className='containerShare'>
                    <Share url={window.location.href} />
                    <button className='btnClose' onClick={() => MySwal.clickCancel()} >Close</button>
                </div>,
            showConfirmButton: false,
            toast: true
        })
    }

    return (
        <div className='container_final'>
            {globalScore === null ? <Loading /> :
                <div className='bgLandingfinal'>

                    <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />

                    <div className='containerDataFinalPage'>
                        <div className='finalPageColumnLeft'>
                            <h1 className='yourscore'>
                                {<Translate content="tituloLastScreen" component="span" />}{globalScore.toFixed(2)}%
                                {<Translate content="tituloLastScreen2" component="span" />}
                                {mode === 'image' ? < Translate content="resultImage" component="span" /> : < Translate content="resultVideo" component="span" />}
                            </h1>
                            <div className="grafico">
                                {globalScore.toFixed(2) === 0? <img style={{height:'9em', width:'35em'}} src={graph0} alt='graph'/> : null}
                                {globalScore.toFixed(2) < 11? <img style={{height:'9em', width:'35em'}} src={graph10} alt='graph'/> : null}
                                {globalScore.toFixed(2) > 10 && globalScore.toFixed(2) < 21? <img style={{height:'9em', width:'35em'}} src={graph20} alt='graph'/> : null}
                                {globalScore.toFixed(2) > 20 && globalScore.toFixed(2) < 31? <img style={{height:'9em', width:'35em'}} src={graph30} alt='graph'/> : null}
                                {globalScore.toFixed(2) > 30 && globalScore.toFixed(2) < 41? <img style={{height:'9em', width:'35em'}} src={graph40} alt='graph'/> : null}
                                {globalScore.toFixed(2) > 40 && globalScore.toFixed(2) < 51? <img style={{height:'9em', width:'35em'}} src={graph50} alt='graph'/> : null}
                                {globalScore.toFixed(2) > 50? <img style={{height:'9em', width:'35em'}} src={graph50} alt='graph'/> : null}
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
                            <div className='containerResultFinalPage'>
                                <h1>{<Translate content="tituloResultadoLastScreen" component="span" />}</h1>
                                <h2 className="porcentaje">{scoreVisual === 0 ? scoreVisual.toFixed() : scoreVisual.toFixed(2)}%</h2>
                                <p>{<Translate content="textoResultadoLastScreen" component="span" />}{videosRecognized}{<Translate content="textoResultadoLastScreen2" component="span" />}{totalRepeats}{<Translate content="textoResultadoLastScreen3" component="span" />}</p>
                            </div>
                            <button onClick={share} className='share'>{<Translate content="compartir" component="span" />}</button>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default withRouter(Finalgame)