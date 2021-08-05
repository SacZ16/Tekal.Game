import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import style from '../Game/Game.module.css';
import './progressBar.css';

const VideoPlayer = () => {

  const { recVideo, template,user } = useSelector(state => state);
  
  const seeVideos = useRef();
  seeVideos.current = user.presentationsGames.seenVideos.length;
  
  const infoVideo = useRef();
  infoVideo.current = recVideo;
  
  const infoTemplate = useRef();
  infoTemplate.current = template;

  const correctPoints = useRef(0);
  const incorrectPoints = useRef(0);

  const press = useRef(false);

  const [border, setBorder] = useState({
    correct: false,
    incorrect: false
  })

  /*Barra de Progreso */
  const ProgressBar = () => {

    return(
        <>
            <progress class='progressBar' id="progress" max={template.length} value={seeVideos.current}></progress>
        </>
    )
  }
  /*Fin Barra de Progreso*/

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !press.current) {
      const concat = infoVideo.current.infoVideo.type + "_repeat";

      if (concat === template[infoVideo.current.filter][1]) {
        correctPoints.current++;
        setBorder({
          ...border,
          correct: true,
          incorrect: false
        });
        press.current = true;
      }
      else {
        incorrectPoints.current++;
        setBorder({
          ...border,
          correct: false,
          incorrect: true
        });
        press.current = true;
      }
      setTimeout(() => {
        setBorder({
          ...border,
          correct: false,
          incorrect: false,
          press: true
        });
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

  return (
    <>
      <progress class='progressBar' id="progress" max={template.length} value={seeVideos.current}></progress>
      {
        <div className={
          (border.correct) ? style.videoGreen : '' ||
            (border.incorrect) ? style.videoRed : ''
        }>
          {(recVideo !== '') &&
            <div width="50%"
              height="50%">
              <ReactPlayer
                width="50%"
                height="50%"
                url={recVideo.infoVideo.url}
                playing
                muted
              />
              <div >{recVideo.infoVideo.id} {recVideo.infoVideo.type} </div>
              <br />
              <div>{template[infoVideo.current.filter]}</div>
            </div>
          }
        </div>
      }
    </>
  )
}

export default VideoPlayer