import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import { Link } from 'react-router-dom';
import style from '../Game/Game.module.css';
import videosURL from '../../assets/videosurl';

export const Game = () => {

  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos);
  const template = useSelector(state => state.template);

  var tope = 0;
  var interval;

  /*----------------------------------------*/

  // var random = Math.round(Math.random() * 1000)
  const template2 = require(`../../assets/level_templates/template_717.json`)[2];

  const filler = template2[0] && template2.filter(e => e[1] === 'filler')
  const vig = template2[0] && template2.filter(e => e[1] === 'vig')
  const target = template2[0] && template2.filter(e => e[1] === 'target')

  const totalVideos = filler.length + vig.length + target.length // videos que nos tienen que mandar
  const arrVideos = videosURL.map((e, i) => Object.create({}, {
    id: { value: i },
    url: { value: e },
  }))

  const videosToSee = [] // array nuevo

  template2.map(e => {
    videosToSee.push(arrVideos.filter(b => b.id === e[0])[0]
    );

    if (videosToSee.find(e => e.id === e[0])) {
      console.log('repeat')
      videosToSee[videosToSee.length - 1].category = e[1] + '_repeat'
      videosToSee[videosToSee.length - 1].idTemplate = e[0]
    } else {
      console.log('no repeat')
      videosToSee[videosToSee.length - 1].category = e[1]
      videosToSee[videosToSee.length - 1].idTemplate = e[0]
    }
  })
  console.log(videosToSee)

  /* const a = arrVideos.map(b => {
    if (b.id === 0) {
      return b
    }
  })
  
  console.log(a) */
  /*----------------------------------------*/

  /*
    - Se selecciona el template y se mira cuantos videos necesitamos.
    - Get y traer URL de Videos(decir cuantos necesitamos).
    - Descargar todos los Videos.
    - Get a donde esta el video y convertir a una URL (VideoURL React).
    - template y formar array videos a reproducir.
  ------------------------------------------------------------------------
  Como lo entendemos 
  - Get a La BD que nos trae que videos va a ver el usuario.
  - En caso de que ya haya jugado se debe verificar que videos vio en la BD.
  - Pasos 
  - Verificar en BD que videos Vio el cliente 
  - Mandarlo a la BD de Tekal 
  */
  function recVideos() {
    viewVideos();
    const filterVideo = videos.find(video => video.id === template[tope][0]);
    dispatch(recVideo(filterVideo, tope));
    tope++;
    if (tope >= videos.length) {

      stopInterval()
    }
  }

  function intervalFunction() {
    interval = setInterval(recVideos, 3000);
  }

  function stopInterval() {
    clearInterval(interval);
  }

  function viewVideos() {
    dispatch(seenVideos(videos));
  }

  useEffect(() => {
    // intervalFunction();
    recVideos();
  }, []);

  return (
    < >
      <div className={style.fondo2}>

        <Link className={style.Link} to='login'>❌</Link>
        <button onClick={recVideos}>Click</button>
        {
          <VideoPlayer stopInterval={stopInterval} recVideos={recVideos} />
        }
      </div>
    </>
  )
}

export default Game;
