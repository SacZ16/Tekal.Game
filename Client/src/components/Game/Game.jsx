import React, { useEffect, useState, useRef } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import { Link } from 'react-router-dom';
import style from '../Styles/Game.module.css'
import videosURL from '../../assets/videosurl';

export const Game = () => {

  // const { allVideos }= useSelector(state => state)

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

  // -----------------------------------------
  const [videosToSee, setVideoPromise] = useState([])
  console.log(videosToSee)

  useEffect(() => {
    var arregloPromesas = videosURL.map(async (url) => {
      return await fetch(url)
        .then(function (res) {
          return res.blob()
        })
        .then(function (video) {
          // console.log(video)
          var url = URL.createObjectURL(video)
          // console.log(url) //la seteas en un array que le vas a pasar a el reproductor de video
          return url
        })
    })
    Promise.all(arregloPromesas)
      .then((arregloPromesasResultas) => {
        setVideoPromise(arregloPromesasResultas)
      })
      /* .then(res => {
        let videosToSee2 = [] // array nuevo
        const arrVideos = res.map((e, i) => Object.create({}, {
          id: { value: i },
          url: { value: e },
        }))
        template[2].map(e => {
          videosToSee2.push(arrVideos.filter(b => b.id === e[0]))
          videosToSee2[videosToSee2.length - 1].category = e[1]
        })
        return videosToSee2
      })
      .then(res => {
        setVideoPromise(res)
      }) */
  }, [])

  //---------------------------------------------------------

  // Original
  /* const arrVideos = videosURL.map((e, i) => Object.create({}, {
    id: { value: i },
    url: { value: e },
  }))

  let videosToSee = [] // array nuevo
  template[2].map(e => {
    videosToSee.push(arrVideos.filter(b => b.id === e[0]))
    videosToSee[videosToSee.length - 1].category = e[1]
  }); */

  // console.log(videosToSee)
  // console.log(template)

  // Elige el video que el usuario va a ver

  function recVideos() {
    if (videosToSee.length > 0) {
      if (tope >= videosToSee.length) {
        return null
      } else {
        viewVideos();
        dispatch(recVideo(videosToSee[tope]));
        tope++;
      }
    }
  }

  // Guarda los videos que el usuario ve

  function viewVideos() {
    if (videosToSee.length > 0) {
      dispatch(seenVideos(videosToSee));
    }
  }

  // Ejecuta la funcion recVideos al renderizar el componente

  useEffect(() => {
    if (videosToSee.length > 0) {
      recVideos();
    }
  }, [videosToSee]);

  return (
    < >
      {<div className={style.fondo2}>

        <Link className={style.Link} to='login'>❌</Link>
        <button onClick={recVideos}>Click</button>
        {
          videosToSee.length < 1 ? <h1>Loading...</h1> : <VideoPlayer videosToSee={videosToSee} recVideos={recVideos} target={target} />
        }
      </div>
      }

    </>
  )
}

export default Game;
