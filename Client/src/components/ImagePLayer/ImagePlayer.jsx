import { useEffect, useRef, useState } from 'react';
import Timer from 'react-compound-timer';
import style from '../Styles/Game.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { withRouter } from 'react-router';
import ProgressBar from '../ProgressBar/ProgressBar';

import cerebroLose from '../Styles/slideSeisEsp.png'
import cerebroEnd from '../Styles/cerebrito_derecha.png'
import Cookies from 'universal-cookie';
import moment from 'moment';

// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const ImagePlayer = ({ recImages, checkLogin, email, target, vig, imageApi, mood, mode }) => {
    const MySwal = withReactContent(Swal)
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const { user, recVideo } = useSelector(state => state); // Traidos del Obj Reducer.

    const seeImages = useRef(); //Videos Vistos por el Usuario en el Juego 
    seeImages.current = user.currentGame.seenVideos;
    // console.log(seeImages.current)
    const infoImages = useRef(); // Informacion del Video
    infoImages.current = recVideo;
    // console.log('Video Actual', infoVideo.current)

    const tiempo = useRef();

    // Copia de VideoPlayer
    const answers = useRef([]); // Respuesta del usuario ante cada video
    // console.log(answers.current)
    const press = useRef(false); // Variable para detectar la barra espaciadora
    const pressSeconds = useRef([]); // segundos al apretar la barra espaciadora
    // console.log('Segundos Apretados', pressSeconds.current)
    const targetFound = useRef({ points: 0, videosTarget: [] }); // Aciertos del usuario en los videos target
    // console.log('Target Encontrados', targetFound.current)
    const falsePositives = useRef([]); // videos que no son target_repeat
    // console.log('Falsos Positivos', falsePositives.current)
    const vigilanceRecognized = useRef([])
    // console.log('Vigilancia Encontrados', vigilanceRecognized.current)
    const lives = useRef(3); // Vidas del usuario 
    // console.log(lives.current)
    const score = parseInt(((targetFound.current.points / target) * 100).toFixed(2)); // puntaje ne base a los target_repeat reconocidos osbre el total de targets
    // console.log(score)
    const finalImages = useRef([]); // Videos vistos con respuetsas
    // console.log(finalImages.current)
    const longTerm = useRef() // habilita a jugar el longTerm
    const scoreVisual = ((targetFound.current.points + vigilanceRecognized.current.length) / (target + vig)) * 100
    //-------------

    const imageTouch = useRef()
    const timerChange = useRef(null);

    const [color, setColor] = useState('rgba(255, 255, 255, 0)'); // Cambia de color al apretar la barra espaciadora
    var bcolor = { 'background': `${color}` }

    const time1 = useRef(0)
    const time2 = useRef(0)

    const handleKeyDown = (event) => {
        if (event.keyCode === 32 && !press.current) {
            handlerGame()
        }
    };

    const handleTouch = () => {
        if (!press.current) {
            handlerGame()
        }
    };

    const handlerGame = () => {
        time2.current = performance.now()
        answers.current.push(1);
        pressSeconds.current.push(Number(((time2.current - time1.current) / 1000).toFixed(4)))
        // pressSeconds.current.push(parseFloat(`${tiempo.current.state.s}.${tiempo.current.state.ms}`))
        if (infoImages.current[1].includes('_')) {
            if (infoImages.current[1] === 'target_repeat') {
                targetFound.current.points++;
                targetFound.current.videosTarget.push(infoImages.current);
            } else {
                falsePositives.current.push(infoImages.current);
                vigilanceRecognized.current.push(infoImages.current);
            }
            setColor('green')
            press.current = true;
            clearTimeout(timerChange.current)
            handlerChange()
        }
        else {
            setColor('red')
            falsePositives.current.push(infoImages.current);
            lives.current--;
            press.current = true;
        }
        setTimeout(() => {
            setColor('rgba(255, 255, 255, 0)');
        }, 500);
    }

    useEffect(() => {
        imageTouch.current.addEventListener("touchstart", handleTouch)
        imageTouch.current.addEventListener("contextmenu", (e) => e.preventDefault());
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);



    useEffect(() => {
        if (seeImages.current.length === imageApi.length) {
            setTimeout(() => {
                localStorage.setItem('longTermImageActive', 'longTermImageActive')
                longTerm.current = true
                if (!press.current) {
                    prevAsset()
                }
                MySwal.fire({
                    toast: true,
                    html:
                        <div >
                            <h1 style={{ color: 'red', textAlign: 'center' }}>{<Translate content="juegoTerminado" component="span" />}</h1>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img style={{ width: '40vh', height: '25vh', margin: '0' }} src={cerebroEnd} alt="cerebroLose" />
                            </div>
                        </div>,
                    timer: 3000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    width: 500
                }).then(() => {
                    checkLongTerm()
                    videosWithAnswers()
                    sessionData()
                    checkLogin()
                })
            }, 3500)
        }
    }, [seeImages.current.length, lives.current]);


    useEffect(() => {
        if (!press.current) {
            prevAsset()
        }
        press.current = false;
    }, [seeImages.current])

    const prevAsset = () => {
        if (seeImages.current.length > 1 && seeImages.current[seeImages.current.length - 2][0][1] !== 'target_repeat') {
            // console.log(seeImages.current[seeImages.current.length - 2])
            answers.current.push(0);
            pressSeconds.current.push(0);
        }
        if (seeImages.current.length > 1 && seeImages.current[seeImages.current.length - 2][0][1] === 'target_repeat') {
            answers.current.push(0);
            pressSeconds.current.push(0);
        }
    }

    // Guarda los datos de la sesion en el reducer
    function videosWithAnswers() {
        seeImages.current.map((e, i) => {
            finalImages.current.push({
                ...e[0][0], answer: answers.current[i],
                seconds: pressSeconds.current[i],
                category: e[0][1].toUpperCase(),
                type: 'image',
                date: `${moment().format()}`,
                mood: mood
            })
        })
        finalImages.current.unshift(score)
        finalImages.current.unshift(email)
    }

    function sessionData() {
        cookies.set('sessionData', {
            score: score,
            scoreVisual: scoreVisual,
            videosRecognized: targetFound.current.points + vigilanceRecognized.current.length,
            totalRepeats: target + vig
        })
        cookies.set('play', {
            play: true
        })
        localStorage.setItem('results', JSON.stringify(finalImages.current))
    }

    const handlerChange = () => {
        if (lives.current === 0) {
            MySwal.fire({
                toast: true,
                html:
                    <div >
                        <h1 style={{ color: 'white', textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: '30px', marginBottom: '-15%' }}>{<Translate content="perdisteTodasLasVidas" component="span" />}</h1>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ width: '60vh', height: '35vh', margin: '0' }} src={cerebroLose} alt="cerebroLose" />
                        </div>
                    </div>,
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
                width: 500
            }).then(() => {
                checkLongTerm()
                videosWithAnswers()
                sessionData()
                checkLogin()
            })
            return null
        }
        recImages()
        tiempo.current && tiempo.current.reset();
    }

    useEffect(() => {
        start()
    }, [seeImages.current.length])

    const start = () => {
        time1.current = performance.now()
        if (seeImages.current.length === 1) {
            timerChange.current = setTimeout(() => {
                handlerChange()
            }, 3000);
        }
        if (seeImages.current.length > 1) {
            timerChange.current = setTimeout(() => {
                handlerChange()
            }, 3000);
        }
    }

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    const checkLongTerm = () => {
        if (mode.includes('-')) {
            mode === 'image-lt' && localStorage.setItem('image-lt', 'image-lt')
            localStorage.setItem('playedDateImage', Date.now())
        }
    }

    return (
        <>
            <div style={bcolor} className={style.fondo}></div>
            <div className={style.videofondo}></div>
            <div width="50%" height="50%" z-index='5' id='video'>
                <div className={style.contenedordelvideo} style={{ top: '2%' }}>
                    <ProgressBar lives={lives.current} max={imageApi.length} progress={seeImages.current.length} />
                    <Timer ref={tiempo} />
                    <div className={style.imgPlayer} ref={imageTouch}>
                        {recVideo[0] && <img alt='imgGame' src={recVideo[0].urlBlop} style={{ boxShadow: `0px 0px 65px ${color}`, borderColor: `${color}`, borderStyle: 'solid', borderWidth: '2px' }} />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default withRouter(ImagePlayer)