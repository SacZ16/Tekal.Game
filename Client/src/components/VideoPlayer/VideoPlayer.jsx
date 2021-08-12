import React,
{
  useRef,
  useState,
  useEffect
} from 'react';
import ReactPlayer from 'react-player/lazy'
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { withRouter } from 'react-router';
import style from '../Styles/Game.module.css';
import swal from '@sweetalert/with-react';
import { sessionInfo } from '../../redux/action';
import '../Styles/progressBar.css';
import axios from 'axios';
// import axios from 'axios';
// import videosURL from '../../assets/videosurl';

const VideoPlayer = ({ history, videoApi, target, recVideos }) => {

  const dispatch = useDispatch();

  const { recVideo, user } = useSelector(state => state); // Traidos del Obj Reducer.
  console.log(recVideo)
  const seeVideos = useRef(); //Videos Vistos por el Usuario en el Juego 
  seeVideos.current = user.currentGame.seenVideos;
  // console.log(seeVideos)

  const infoVideo = useRef(); // Informacion del Video
  infoVideo.current = recVideo;

  const targetFound = useRef({ points: 0, videosTarget: [] }); // Aciertos del usuario en los videos target.
  const targetNotPress = useRef({ notPress: 0, videosTargetNotPress: [] }); // Videos target en los que no presiono.
  const answers = useRef([]) // Respuesta del usuario ante cada video
  const score = 0
  console.log(((targetFound.current.points / target) * 100))
  const finalVideos = useRef([]) // Videos vistos con respuetsas
  // console.log(finalVideos.current)
  const lives = useRef(3); // Vidas del usuario 
  const press = useRef(false); // Variable para detectar la barra espaciadora

  const [color, setColor] = useState('#067eef'); // Cambia de color al apretar la barra espaciadora

  const play = useRef(true) // pausa o inicia el video

  const progress = useRef() // segundos viendo el video
  const pressSeconds = useRef([]) // segundos al apretar la barra espaciadora
  // console.log('pressS', pressSeconds.current)

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !press.current) {
      answers.current.push(1)
      pressSeconds.current.push(progress.current)
      if (infoVideo.current[1].includes('_')) {
        if (infoVideo.current[1] === 'target_repeat') {
          targetFound.current.points++;
          targetFound.current.videosTarget.push(infoVideo.current)
        }
        setColor('green')
        press.current = true;
      }
      else {
        lives.current--;
        setColor('red')
        press.current = true;
      }
      setTimeout(() => {
        setColor('#067eef')
      }, 500)
    }
  };

  // Deja apretar la barra nuevamente y recoje datos de cuando no se presiona la barra
  useEffect(() => {
    if (!press.current) {
      if (seeVideos.current.length > 1 && seeVideos.current[seeVideos.current.length - 2][0][1] !== 'target_repeat') {
        answers.current.push(0)
        pressSeconds.current.push(0)
      }
      if (seeVideos.current.length > 1 && seeVideos.current[seeVideos.current.length - 2][0][1] === 'target_repeat') {
        targetNotPress.current.notPress++
        targetNotPress.current.videosTargetNotPress.push(seeVideos.current[seeVideos.current.length - 2][0])
        answers.current.push(0)
        pressSeconds.current.push(0)
        // console.log('no apretaste')
      }
    }
    press.current = false;
  }, [recVideo]);

  // Reconoce la barra espaciadora

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  var bcolor = { 'background': `${color}` }

  /*Cambio de Vidas y Videos Nuevos */
  useEffect(() => {
    if (seeVideos.current.length + 1 > videoApi.length) {
      play.current = false
      videosWithAnswers()
      sessionData()
      swal({
        text: "Finalizo el Juego",
        button: 'Continuar',
      })
        .then(() => {
          history.push('/close');
        });
    }
    if (lives.current === 0) {
      play.current = false
      videosWithAnswers()
      sessionData();
      swal({
        text: "UPS perdiste tus 3 vidas, a prestar mas atencion la proxima vez",
        button: 'Continuar',
      })
        .then(() => {
          history.push('/close');
        });
    }
  }, [seeVideos.current.length, lives.current]);

  // Guarda los datos de la sesion en el reducer

  function videosWithAnswers() {
    seeVideos.current.map((e, i) => {
      finalVideos.current.push({
        ...e[0][0], answer: answers.current[i],
        seconds: pressSeconds.current[i],
        category: e[0][1],
        type: 'Video',
        date: new Date()
      })
    })
  }

  useEffect(() => {
    console.log(finalVideos.current)
    axios.post('http://localhost:3001/postinfo', finalVideos.current)
  }, [finalVideos.current])

  function sessionData() {
    let obj = Object.create({}, {
      targetFound: { value: targetFound.current },
      targetNotPress: { value: targetNotPress.current },
      score: { value: score.current },
      /* lives: { value: lives.current }, */
      /* targetVideos: { value: target.length } */
    });
    dispatch(sessionInfo(obj));
  }

  /* const onReady = () => {
    console.log('ready')
    play.current = true
  } */

  const onProgress = (e) => {
    progress.current = e.playedSeconds
  }

  return (

    <>
      <div style={bcolor} className={style.fondo}></div>
      <div className={style.videofondo}></div>

      <progress
        className='progressBar'
        id="progress" max={videoApi.length}
        value={seeVideos.current.length}>
      </progress>

      {(recVideo !== '') && <div width="50%" height="50%" z-index='5' id='video'>
        <ReactPlayer className={style.video}
          z-index='5'
          url={recVideo[0] && recVideo[0].urlBlop}
          onProgress={(e) => onProgress(e)}
          onEnded={recVideos}
          playing={play.current}
          muted
          width='100%'
          height='100%'
          progressInterval={250}
        />
      </div>
      }
    </>
  )
}

export default withRouter(VideoPlayer)