import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Styles/final.css'
import '../Styles/share.css'
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
import GameModes from '../GameModes/GameModes'

function Finalgame({ history }) {
    const MySwal = withReactContent(Swal)

    const dispatch = useDispatch()
    const cookies = new Cookie();
    const mode = localStorage.getItem('mode') // Toma el modo de juego

    const [sessionData, setSessionData] = useState({
        score: 0,
        scoreVisual: null,
        videosRecognized: 0,
        totalRepeats: 0
    })
    const { scoreVisual, totalRepeats, videosRecognized } = sessionData
    const [averageScore, setAverageScore] = useState(null)
    const [globalScore, setGlobalScore] = useState(null)
    const globalScoreValidation = globalScore === 0 ? globalScore.toFixed() : globalScore

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
        if (scoreVisual !== null) {
            if (mode.includes('-')) {
                const mode2 = mode.slice(0, -3)
                const resGlobal = await axios.post('http://localhost:3001/globalScore', {
                    score: scoreVisual,
                    type: mode2
                })
                const resAverage = await axios.post('http://localhost:3001/averageScore', {
                    email: emailCokkie,
                    scoreFront: scoreVisual,
                    type: mode2
                })
                setGlobalScore(Number(resGlobal.data.betterThan.toFixed(2)))
                setAverageScore(resAverage.data.averageScore)
                localStorage.setItem('averageScore', resAverage.data.averageScore)
            } else {
                const resGlobal = await axios.post('http://localhost:3001/globalScore', {
                    score: scoreVisual,
                    type: mode
                })
                const resAverage = await axios.post('http://localhost:3001/averageScore', {
                    email: emailCokkie,
                    scoreFront: scoreVisual,
                    type: mode
                })
                setGlobalScore(Number(resGlobal.data.betterThan.toFixed(2)))
                setAverageScore(resAverage.data.averageScore)
                localStorage.setItem('averageScore', resAverage.data.averageScore)
            }
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

    const popUpGameMode = () => {
        MySwal.fire({
            html:
                <div>
                    <GameModes averageScore={averageScore} />
                </div>,
            showConfirmButton: false
        })
    }

    const again = () => {
        cookies.remove('sessionData')
        cookies.remove('play')
        dispatch(resetReducer())
        popUpGameMode()
    }

    useEffect(() => {
        postDataa()
    }, [])

    const postDataa = async () => {
        console.log(resultadoparaenviar)
        if (resultadoparaenviar) {
            await axios.post('http://localhost:3001/videoInfo', resultadoparaenviar)
            await axios.post('http://localhost:3001/gameInfo', resultadoparaenviar)
            localStorage.removeItem('results')
        }
    }

    /* Cambio de idioma */

    const [language, _setLanguage] = useState(localStorage.getItem('idioma'));
    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    const share = () => {
        MySwal.fire({
            html:
                <div className='containerShare'>
                    <img src='https://www.pngall.com/wp-content/uploads/2/Share-PNG-Free-Download.png' alt='shareImg' />
                    <Share url={window.location.href} />
                    <button className='btnClose' onClick={() => MySwal.clickCancel()} >Close</button>
                </div>,
            showConfirmButton: false,
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
                                {<Translate content="tituloLastScreen" component="span" />}{globalScoreValidation}%
                                {<Translate content="tituloLastScreen2" component="span" />}
                                {mode === 'image' ? < Translate content="resultImage" component="span" /> : < Translate content="resultVideo" component="span" />}
                            </h1>
                            <div className="grafico">
                                {globalScoreValidation === 0 ? <img style={{ height: '9em', width: '35em' }} src={graph0} alt='graph' /> : null}
                                {globalScoreValidation < 11 ? <img style={{ height: '9em', width: '35em' }} src={graph10} alt='graph' /> : null}
                                {globalScoreValidation > 10 && globalScoreValidation < 21 ? <img style={{ height: '9em', width: '35em' }} src={graph20} alt='graph' /> : null}
                                {globalScoreValidation > 20 && globalScoreValidation < 31 ? <img style={{ height: '9em', width: '35em' }} src={graph30} alt='graph' /> : null}
                                {globalScoreValidation > 30 && globalScoreValidation < 41 ? <img style={{ height: '9em', width: '35em' }} src={graph40} alt='graph' /> : null}
                                {globalScoreValidation > 40 && globalScoreValidation < 51 ? <img style={{ height: '9em', width: '35em' }} src={graph50} alt='graph' /> : null}
                                {globalScoreValidation > 50 ? <img style={{ height: '9em', width: '35em' }} src={graph50} alt='graph' /> : null}
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