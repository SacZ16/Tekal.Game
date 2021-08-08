import React,
{
  useRef,
  useState,
  useEffect
} from 'react';
import ReactPlayer from 'react-player';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { withRouter } from 'react-router';
import style from '../Styles/Game.module.css';
import swal from '@sweetalert/with-react';

import { sessionInfo } from '../../redux/action';
import '../Styles/progressBar.css';

// import videosURL from '../../assets/videosurl';

const VideoPlayer = ({ stopInterval, history, recVideos }) => {

  const dispatch = useDispatch();

  const {
    recVideo,
    template,
    user,
    videos
  } = useSelector(state => state); // Traidos del Obj Reducer.
  const seeVideos = useRef(); //Videos Vistos por el Usuario en el Juego 
  seeVideos.current = user.currentGame.seenVideos;

  const infoVideo = useRef(); // Informacion del Video
  infoVideo.current = recVideo;

  const infoTemplate = useRef(); // Template de Prueba generado estatico
  infoTemplate.current = template;

  const targetFound = useRef({ points: 0, videosTarget: [] }); // Aciertos del usuario en los videos target.
  const targetNotPress = useRef({ notPress: 0, videosTargetNotPress: [] }); // Videos target en los que no presiono.
  const lives = useRef(3); // Vidas del usuario 
  const press = useRef(false); // Variable para detectar la barra espaciadora
  const finish = useRef(false)

  const [color, setColor] = useState('#067eef'); // 

  // Cambia de color al apretar la barra espaciadora
  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !press.current) {
      if (infoVideo.current.category.includes('_')) {
        if (infoVideo.current.category === 'target_repeat') {
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

  // Deja apretar la barra nuevamente
  useEffect(() => {
    if (!press.current) {
      if (seeVideos.current.length > 1 && seeVideos.current[seeVideos.current.length - 2][0].category === 'vig_repeat') {
        targetNotPress.current.notPress++
        targetNotPress.current.videosTargetNotPress.push(seeVideos.current[seeVideos.current.length - 2][0])
        console.log('no apretaste')
      }
    }
    press.current = false;
  }, [recVideo]);

  // Reconoce la barra espaciadora

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  var bcolor = { 'background': `${color}` }

  /*Cambio de Vidas y Videos Nuevos */

  useEffect(() => {
    if (seeVideos.current.length + 1 > videos.length) {
      finish.current = true
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
      finish.current = true
      sessionData();
      stopInterval();
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

  function sessionData() {
    let obj = Object.create({}, {
      targetFound: { value: targetFound.current },
      lives: { value: lives.current }
    });
    dispatch(sessionInfo(obj));
  }

  return (

    <>
      <div style={bcolor} className={style.fondo}></div>
      <div className={style.videofondo}></div>
      <progress
        className='progressBar'
        id="progress" max={videos.length}
        value={seeVideos.current.length}>
      </progress>

      {(recVideo !== '') &&
        <div width="50%"
          height="50%" z-index='5'>
          <ReactPlayer className={style.video}
            z-index='5'
            url={recVideo[0] && recVideo[0].url}
            onEnded={!finish && recVideos}
            controls={false}
            playing
            muted
          />
        </div>

      }
    </>
  )
}

export default withRouter(VideoPlayer)