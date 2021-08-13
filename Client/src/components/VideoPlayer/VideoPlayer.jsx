import  React,
{
        useRef,
        useState,
        useEffect
}                   from 'react';
import  ReactPlayer from 'react-player/lazy';
import {
        useDispatch,
        useSelector
}                    from 'react-redux';
import {withRouter } from 'react-router';
import  style        from '../Styles/Game.module.css';
import  swal         from '@sweetalert/with-react';
import {sessionInfo} from '../../redux/action';
import  axios        from 'axios';
import {Link }       from 'react-router-dom';

import '../Styles/progressBar.css';

  const VideoPlayer = ({ history, videoApi, target, recVideos, email }) => {

  const dispatch = useDispatch();

  const { recVideo, user } = useSelector(state => state); // Traidos del Obj Reducer.
  
  const seeVideos = useRef(); //Videos Vistos por el Usuario en el Juego 
  
  seeVideos.current = user.currentGame.seenVideos;
  
  const infoVideo = useRef(); // Informacion del Video
  
  infoVideo.current = recVideo;

  const targetFound = useRef({ points: 0, videosTarget: [] }); // Aciertos del usuario en los videos target.

  const targetNotPress = useRef({ notPress: 0, videosTargetNotPress: [] }); // Videos target en los que no presiono.

  const answers = useRef([]); // Respuesta del usuario ante cada video

  const score = parseInt(((targetFound.current.points / target) * 100).toFixed(2)); // puntaje ne base a los target_repeat reconocidos osbre el total de targets

  const falsePositives = useRef([]); // videos que no son target_repeat

  const averageFalsePositive = (falsePositives.current.length / seeVideos.current.length); // promedio de falsos postivios

  const vigilanceRecognized = useRef([]); // videos vigilancia reconocidos
  // const averageVigilanceReconznized = (vigilanceRecognized.current.length / (seeVideos.current.filter(e => e[0][1] === "vig_repeat")).length) // promedio de video de vigilancia reconocidos

  const finalVideos = useRef([]); // Videos vistos con respuetsas

  const lives = useRef(3); // Vidas del usuario 

  const press = useRef(false); // Variable para detectar la barra espaciadora

  const [color, setColor] = useState('rgba(255, 255, 255, 0)'); // Cambia de color al apretar la barra espaciadora

  const play = useRef(true); // pausa o inicia el video

  const progress = useRef(); // segundos viendo el video
  
  const pressSeconds = useRef([]); // segundos al apretar la barra espaciadora

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !press.current) {
      answers.current.push(1);
      pressSeconds.current.push(progress.current);
      if (infoVideo.current[1].includes('_')) {
        if (infoVideo.current[1] === 'target_repeat') {
          targetFound.current.points++;
          targetFound.current.videosTarget.push(infoVideo.current);
        } else {
          falsePositives.current.push(infoVideo.current);
          vigilanceRecognized.current.push(infoVideo.current);
        }
        setColor('green')
        press.current = true;
      }
      else {
        setColor('red')
        falsePositives.current.push(infoVideo.current);
        lives.current--;
        press.current = true;
      }
      setTimeout(() => {
        setColor('rgba(255, 255, 255, 0)');
      }, 500);
    }
  };

  // Deja apretar la barra nuevamente y recoje datos de cuando no se presiona la barra
  useEffect(() => {
    if (!press.current) {
      if (seeVideos.current.length > 1 && seeVideos.current[seeVideos.current.length - 2][0][1] !== 'target_repeat') {
        answers.current.push(0);
        pressSeconds.current.push(0);
      }
      if (seeVideos.current.length > 1 && seeVideos.current[seeVideos.current.length - 2][0][1] === 'target_repeat') {
        targetNotPress.current.notPress++;
        targetNotPress.current.videosTargetNotPress.push(seeVideos.current[seeVideos.current.length - 2][0]);
        answers.current.push(0);
        pressSeconds.current.push(0);
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
    /*    if (seeVideos.current.length > videoApi.length) {
         play.current = false
         videosWithAnswers()
         sessionData()
         swal({
           text: "Finalizo el Juego",
           button: 'Continuar',
         })
           .then(() => {
             postData()
             history.push('/close');
           });
       } */
    if (lives.current === 0) {
      play.current = false
      videosWithAnswers()
      sessionData();
      swal({
        text: "UPS perdiste tus 3 vidas, a prestar mas atencion la proxima vez",
        button: 'Continuar',
      })
        .then(() => {
          postData()
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
        category: e[0][1].toUpperCase(),
        type: 'Video',
        date: new Date()
      })
    })
    finalVideos.current.unshift(score)
    finalVideos.current.unshift(email)
  }

  const postData = async () => {
    await axios.post('http://localhost:3001/videoInfo', finalVideos.current)
    await axios.post('http://localhost:3001/gameInfo', finalVideos.current)
  }

  function sessionData() {
    let obj = Object.create({}, {
      targetFound: { value: targetFound.current },
      targetNotPress: { value: targetNotPress.current },
      score: { value: score },
      /* lives: { value: lives.current }, */
      /* targetVideos: { value: target.length } */
    });
    dispatch(sessionInfo(obj));
  }

  const onProgress = (e) => {
    if (seeVideos.current.length === videoApi.length) {
      if (e.playedSeconds === e.loadedSeconds) {
        setTimeout(() => {
          play.current = false
          videosWithAnswers()
          sessionData()
          swal({
            text: "Finalizo el Juego",
            button: 'Continuar',
          })
            .then(() => {
              postData()
              history.push('/close');
            });
        }, 500)

      }
    }
    progress.current = e.playedSeconds;
  }

  return (

    <>
      <div style={bcolor} className={style.fondo}></div>
      <div className={style.videofondo}></div>

      {
        (recVideo !== '') &&
        <div width="50%"
          height="50%" z-index='5' id='video'
        >

          <div className={style.contenedordelvideo}>
            <div style={{ width: '90%', margin: '0', display: 'flex' }}>
              {
                lives.current === 3 ? 
                <div style=
                  {{ 
                    color: 'red', display: 'flex', flexDirection: 'row', 
                    width: '70px', marginTop: '-30px' 
                  }}>❤ ❤ ❤
                </div> : null
              }
              {
                lives.current === 2 ? 
                <div style=
                  {{ 
                    color: 'red', display: 'flex', flexDirection: 'row', 
                    width: '70px', marginTop: '-30px' 
                  }}>❤ ❤ 💔
                </div> : null
              }
              {
                lives.current === 1 ? 
                <div style=
                  {{ 
                    color: 'red', display: 'flex', flexDirection: 'row', 
                    width: '70px', marginTop: '-30px' 
                  }}>❤ 💔 💔
                </div> : null
              }
              {
                lives.current === 0 ? 
                <div style=
                  {{ 
                    color: 'red', display: 'flex', flexDirection: 'row', 
                    width: '70px', marginTop: '-30px' 
                  }}>💔 💔 💔
                </div> : null
              }
              <progress
                className='progressBar'
                id="progress" max={videoApi.length}
                value={seeVideos.current.length}>
              </progress>
              <Link style={{ marginLeft: '40px', marginTop: '-37px', color: 'white', fontSize: '25px', textDecoration: 'none' }} to='login'>
                x
              </Link>
            </div>


            <ReactPlayer className={style.video}
              style={{ boxShadow: `0px 0px 65px ${color}`, borderColor: `${color}`, borderStyle: 'solid', borderWidth: '2px' }}
              /* style={{ borderColor: `${color}`, borderStyle: 'solid', borderWidth: '5px' }} */
              z-index='5'
              url={recVideo[0] && recVideo[0].urlBlop}
              onProgress={(e) => onProgress(e)}
              onEnded={recVideos}
              playing={play.current}
              muted
              progressInterval={250}
            />
          </div>
        </div>

      }
    </>
  )
}

export default withRouter(VideoPlayer)

