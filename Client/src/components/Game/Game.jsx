import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import { Link } from 'react-router-dom';
import style from '../Styles/Game.module.css'
import videosURL from '../../assets/videosurl';

export const Game = () => {

  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos);
  const template = useSelector(state => state.template);

  var tope = 0;
  var interval;

  /*----------------------------------------*/

  // Selecciona un template al azar

  var random = Math.round(Math.random() * 999)
  const template2 = require(`../../assets/level_templates/template_${random}.json`)[2];

  // Sacamos los videos unicos

  const filler = template2[0] && template2.filter(e => e[1] === 'filler')
  const vig = template2[0] && template2.filter(e => e[1] === 'vig')
  const target = template2[0] && template2.filter(e => e[1] === 'target')

  const totalVideos = filler.length + vig.length + target.length // videos que nos tienen que mandar

  // 

  const arrVideos = videosURL.map((e, i) => Object.create({}, {
    id: { value: i },
    url: { value: e },
  }))

  let videosToSee = [] // array nuevo

  template2.map(e => {
    videosToSee.push(arrVideos.filter(b => b.id === e[0]))
    videosToSee[videosToSee.length - 1].category = e[1]
  });

  // console.log(videosToSee)

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

  // Elige el video que el usuario va a ver

  function recVideos() {
    if (tope >= videos.length) {
      stopInterval()
    }
    viewVideos();
    // const filterVideo = videos.find(video => video.id === template[tope][0]);
    dispatch(recVideo(videosToSee[tope]));
    tope++;
  }

  function intervalFunction() {
    interval = setInterval(recVideos, 3000);
  }

  function stopInterval() {
    clearInterval(interval);
  }

  // Guarda los videos que el usuario ve

  function viewVideos() {
    dispatch(seenVideos(videosToSee));
  }

  // Ejecuta la funcion recVideos al renderizar el componente

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
