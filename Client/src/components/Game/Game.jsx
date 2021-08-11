import React, { useEffect, useState, useRef } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import { Link } from 'react-router-dom';
import style from '../Styles/Game.module.css'
import videosURL from '../../assets/videosurl';
import Cookie from 'universal-cookie'
import axios from 'axios'

export const Game = () => {

  const dispatch = useDispatch();
  var tope = 0;

  /*----------------------------------------*/

  /* const [infoUser, SetInfoUser] = useState('')
  var emailCokkie;
  const cookies = new Cookie(); */

  /*  // Sacando el email
   if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
   else { emailCokkie = cookies.get('userInfo').Items[0].email }
 
   //Sacando info
   const CheckUserData = async (email) => {
     let SearchEmail = {
       email: email
     }
     let response = await axios.post('http://localhost:3001/info', SearchEmail)
     SetInfoUser(response)
     return response
   }
 
   if (!infoUser) {
     CheckUserData(emailCokkie);
   }
 
   if (infoUser) {
     if (!infoUser.data.Items[0].age || !infoUser.data.Items[0].name) {
       window.location.href = ('form')
     }
   }
  */
  // Selecciona un template al azar


  var random = Math.round(Math.random() * 999)
  const template = require(`../../assets/level_templates/template_${random}.json`);
  const target = template[0] // Total de targets en el template
  // const totalVideos = template[0] + template[1] // videos que nos tienen que mandar

  /*   const videoArr = [] // array de videos en donde cada posicion es un array
    template[2].map((e, i) => {
      if (template[2][i][0] === videoArr.length > 0 && videoArr[i][0]) {
        videoArr.push([...e, template[2][i][1]])
      } else {
        videoArr.push([...e, videosURL[i]])
      }
    }) */
  // console.log(videoArr)

  /*  const videoObj = videoArr.map(e => Object.create({}, { // en cada posicion hay un objeto
     id: { value: e[0] },
     category: { value: e[1] },
     url: { value: e[2] }
   })) */

  // console.log(videoObj)

  // -------

  const arrVideos = videosURL.map((e, i) => Object.create({}, {
    id: { value: i },
    url: { value: e },
  }))

  let videosToSee = [] // array nuevo
  template[2].map(e => {
    videosToSee.push(arrVideos.filter(b => b.id === e[0]))
    videosToSee[videosToSee.length - 1].category = e[1]
  });

  // console.log(videosToSee)
  // console.log(template)

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

  function recVideos(lives) {
    // console.log(lives)
    if (tope >= videosToSee.length || lives === 0) {
      return null
    } else {
      viewVideos();
      // const filterVideo = videos.find(video => video.id === template[tope][0]);
      dispatch(recVideo(videosToSee[tope]));
      tope++;
    }
  }

  // Guarda los videos que el usuario ve

  function viewVideos() {
    dispatch(seenVideos(videosToSee));
  }

  // Ejecuta la funcion recVideos al renderizar el componente

  useEffect(() => {
    recVideos();
  }, []);

  return (
    < >
      <div className={style.fondo2}>

        <Link className={style.Link} to='login'>❌</Link>
        <button onClick={recVideos}>Click</button>
        {
          <VideoPlayer videosToSee={videosToSee} recVideos={recVideos} target={target} />
        }
      </div>
    </>
  )
}

export default Game;
