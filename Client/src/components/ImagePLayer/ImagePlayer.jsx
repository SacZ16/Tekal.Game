import React, { useEffect, useRef, useState } from 'react';
import imagesPrueba from '../../assets/img/imagesPrueba';
import Timer from 'react-compound-timer';
import style from '../Styles/Game.module.css';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import Cookie from 'universal-cookie'
import { withRouter } from 'react-router';
import ProgressBar from '../ProgressBar/ProgressBar';

const ImagePlayer = ({ history, recImages }) => {

    const cookies = new Cookie();
    const { user, recVideo } = useSelector(state => state); // Traidos del Obj Reducer.

    const seeImages = useRef(); //Videos Vistos por el Usuario en el Juego 
    seeImages.current = user.currentGame.seenVideos;
    // console.log('Videos Vistos', seeImages.current)

    const infoImages = useRef(); // Informacion del Video
    infoImages.current = recVideo;
    // console.log('Video Actual', infoVideo.current)

    const contador = useRef(0)
    const tiempo = useRef();
    // console.log(tiempo)

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
    const finalImages = useRef([]); // Videos vistos con respuetsas
    // console.log(finalImages.current)
    //-------------

    const imageTouch = useRef()

    const [color, setColor] = useState('rgba(255, 255, 255, 0)'); // Cambia de color al apretar la barra espaciadora
    var bcolor = { 'background': `${color}` }

    const handleKeyDown = (event) => {
        if (event.keyCode === 32 && !press.current) {
            answers.current.push(1);
            pressSeconds.current.push(parseFloat(`${tiempo.current.state.s}.${tiempo.current.state.ms}`))
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
    };

    const handleTouch = () => {
        if (!press.current) {
            answers.current.push(1);
            pressSeconds.current.push(parseFloat(`${tiempo.current.state.s}.${tiempo.current.state.ms}`))
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
    };
    useEffect(() => {
        imageTouch.current.addEventListener("touchstart", handleTouch)
        window.addEventListener("contextmenu", (e) => e.preventDefault());
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    useEffect(() => {
        if (seeImages.current.length === imagesPrueba.length) {
            setTimeout(() => {
                if (!press.current) {
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
                videosWithAnswers()
                Swal.fire({
                    title: "Finalizo el Juego",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                }).then(() => {

                    if (!cookies.get('userInfo')) {
                        history.push('/preclose');
                    }
                    if (cookies.get('userInfo')) {
                        history.push('/close');
                    }
                })
            }, 3500)
        }
        if (lives.current === 0) {
            videosWithAnswers()
            if (!cookies.get('userInfo')) {
                history.push('/preclose');
            }
            if (cookies.get('userInfo')) {
                history.push('/close');
            }
        }
    }, [seeImages.current.length, lives.current]);

    useEffect(() => {
        if (!press.current) {
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
        press.current = false;
    }, [seeImages.current])

    // Guarda los datos de la sesion en el reducer
    function videosWithAnswers() {
        seeImages.current.map((e, i) => {
            finalImages.current.push({
                ...e[0][0], answer: answers.current[i],
                seconds: pressSeconds.current[i],
                category: e[0][1].toUpperCase(),
                type: 'Image',
                date: `${new Date()}`
            })
        })
        finalImages.current.unshift(0) // score
        finalImages.current.unshift('algo@algo.com') // email
    }
    const handlerChange = () => {
        recImages()
        tiempo.current && tiempo.current.reset();
        contador.current++
    }
    useEffect(() => {
        if (seeImages.current.length === 1) {
            setTimeout(() => {
                handlerChange()
            }, 3000);
        }
        if (seeImages.current.length > 1) {
            setTimeout(() => {
                handlerChange()
            }, 3000);
        }
    }, [seeImages.current.length])

    return (
        <>
            <div style={bcolor} className={style.fondo}></div>
            <div className={style.videofondo}></div>
            <div width="50%" height="50%" z-index='5' id='video'>
                <div className={style.contenedordelvideo}>
                    <ProgressBar lives={lives.current} max={imagesPrueba.length} progress={seeImages.current.length} />
                    <Timer ref={tiempo} />
                    <div ref={imageTouch}>
                        {recVideo[0] && <img src={recVideo[0].urlBlop} />}
                    </div>
                </div>
            </div>

        </>
    )
}

export default withRouter(ImagePlayer)