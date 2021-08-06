import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import style from '../Game/Game.module.css';
import swal from '@sweetalert/with-react'

import './progressBar.css';

const VideoPlayer = ({ stopInterval, history }) => {

  const { recVideo, template, user, videos } = useSelector(state => state);

  const seeVideos = useRef();
  seeVideos.current = user.presentationsGames.seenVideos;

  const infoVideo = useRef();
  infoVideo.current = recVideo;

  const infoTemplate = useRef();
  infoTemplate.current = template;

  const correctPoints = useRef(0);
  const incorrectPoints = useRef(0);

  const press = useRef(false);
  const [color, setColor] = useState('#067eef')
  /*  const [border, setBorder] = useState({
     correct: false,
     incorrect: false
   }) */

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !press.current) {
      const concat = infoVideo.current.infoVideo.type + "_repeat";

      if (concat === template[infoVideo.current.filter][1]) {
        correctPoints.current++;
        /*  setBorder({
           ...border,
           correct: true,
           incorrect: false
         }); */
        setColor('green')
        press.current = true;
      }
      else {
        incorrectPoints.current++;
        /*   setBorder({
            ...border,
            correct: false,
            incorrect: true
          }); */
        setColor('red')
        press.current = true;
      }
      setTimeout(() => {
        // setBorder({
        //   ...border,
        //   correct: false,
        //   incorrect: false,
        //   press: true
        // });
        setColor('#067eef')
      }, 500)
    }
  };

  useEffect(() => {
    press.current = false;
  }, [recVideo]);

  useEffect(() => {
    if (incorrectPoints.current === 3) {
      stopInterval()
      swal({
        text: "UPS perdiste tus 3 vidas, a prestar mas atencion la proxima vez",
        button: 'Continuar',
      })
        .then(() => {
          console.log('Finalizo');
          history.push('/close')
        });
    }
  }, [incorrectPoints.current])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  var bcolor = { 'background': `${color}` }

  useEffect(() => {
    if (seeVideos.current.length + 1 > videos.length) {
      swal({
        text: "Finalizo el Juego",
        button: 'Continuar',
      })
        .then(() => {
          console.log('Finalizo');
          history.push('/close')
        });
    }
  }, [seeVideos.current.length]);

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