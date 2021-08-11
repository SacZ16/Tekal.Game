import React, { useEffect, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import { Link } from 'react-router-dom';
import style from '../Styles/Game.module.css'
import videosURL from '../../assets/videosurl';
import Cookie from 'universal-cookie';
import axios from 'axios';

export const Game = () => {

  const dispatch = useDispatch();
  var tope = 0;

  /*----------------------------------------*/
  
  const [infoUser,SetInfoUser] = useState({firtsrender: false})
  var emailCokkie;
  const cookies= new Cookie();
  if(!cookies.get('userInfo').Items){ emailCokkie=cookies.get('userInfo')[0].email }
  else{emailCokkie = cookies.get('userInfo').Items[0].email}

  //Sacando info
  const CheckUserData = async (email) => {
    let SearchEmail = {
      email: email
    }
    let response = await axios.post('http://localhost:3001/info', SearchEmail)
    SetInfoUser(response)
    return response
  }

  if(infoUser.hasOwnProperty('firtsrender')) {
  CheckUserData(emailCokkie);
}

if(infoUser.data){
  if(!infoUser.data.Items[0].age || !infoUser.data.Items[0].name){
    window.location.href = ('form')
  } 
}

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
    if (tope >= videosToSee.length || lives === 0) return null
    viewVideos();
    // const filterVideo = videos.find(video => video.id === template[tope][0]);
    dispatch(recVideo(videosToSee[tope]));
    tope++;
  }

  // Guarda los videos que el usuario ve

  function viewVideos() {
    dispatch(seenVideos(videosToSee));
  }

  // Ejecuta la funcion recVideos al renderizar el componente

  // Ejecuta la funcion recVideos al renderizar el componente
  // useEffect(() => {
  //   // intervalFunction();
  //   console.log('uwu')
  // }, []);

  
  console.log(infoUser.hasOwnProperty('firtsrender'))
  if(!infoUser.data){return (<><h1>cargandooo....</h1></>)}
  if(!infoUser.data.Items){return (<><h1>cargandooo....</h1></>)}
  recVideos()
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