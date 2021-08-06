import  React, 
      { useRef, 
        useState, 
        useEffect }   from 'react';
import  ReactPlayer   from 'react-player';
import { 
        useDispatch, 
        useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import   style        from '../Game/Game.module.css';
import   swal         from '@sweetalert/with-react';

import { sessionInfo } from '../../redux/action';
import './progressBar.css';

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

  const correctPoints = useRef(0); // Aciertos del usuario en el juego.

  const lives = useRef(3); // Vidas del usuario iniciando el juego

  const press = useRef(false); // Variable para detectar la barra espaciadora

  const [color, setColor] = useState('#067eef'); // 
  

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !press.current && template[infoVideo.current.filter]) {
      const concat = infoVideo.current.infoVideo.type + "_repeat";
      if (concat === template[infoVideo.current.filter][1]) {
        correctPoints.current++;
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

  useEffect(() => {
    press.current = false;
  }, [recVideo]);

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

  function sessionData() {
    let obj = Object.create({}, {
      correctPoints: { value: correctPoints.current },
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
            url={recVideo.infoVideo.url}
            onEnded={recVideos}
            playing
            muted
          />
          {/* <div >{recVideo.infoVideo.id} {recVideo.infoVideo.type} </div> */}
          <br />
          {/* <div>{template[infoVideo.current.filter]}</div> */}
        </div>

      }
    </>
  )
}

export default withRouter(VideoPlayer)