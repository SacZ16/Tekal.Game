import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import { withRouter } from 'react-router';

import Cookie from 'universal-cookie';
import axios from 'axios';

// Componentes
import Loading from '../Loading/Loading';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import ImagePlayer from '../ImagePLayer/ImagePlayer';
// Estilos
import style from '../Styles/Game.module.css'

export const Game = ({ history }) => {

  const dispatch = useDispatch();
  // const { score } = useSelector(state => state.user.currentGame)
  const tope = useRef(0) // Determina posicion del video/imagen
  const mood = localStorage.getItem('mood') // Toma el estado de animo 
  const mode = localStorage.getItem('mode') // Toma el modo de juego

  var emailCokkie // Email del usuario
  const cookies = new Cookie()

  const [assetsApi, setAssetsApi] = useState() // videos/imagenes provenientes de la base de datos
  // console.log(assetsApi)
  const [assetsBlop1, setAssetsBlop1] = useState() // array con las 10 primeras URLs en formato Blop
  // console.log('blop 1', assetsBlop1)
  const [assetsBlop2, setAssetsBlop2] = useState() // array con el resto de URLs en formato Blop
  // console.log('blop 2', assetsBlop2)
  const assetsToSeeBlop = useRef() // array final para ser mostrado al usuario
  // console.log('toSee', assetsToSeeBlop.current)

  /* Trae los activos de la API */
  useEffect(() => {
    if (!assetsApi) {
      if (mode === 'video' || mode === 'image') {
        console.log(mode)
        axios.post('http://localhost:3001/links', {
          email: emailCokkie,
          mode: mode
        })
          .then(res => {
            setAssetsApi(res.data)
          })
      } else {
        axios.post('http://localhost:3001/longTerm', {
          email: emailCokkie,
          mode: mode.slice(0, -3)
        })
          .then(res => {
            setAssetsApi(res.data)
          })
      }
    }
    if (assetsApi) {
      var arr1 = assetsApi[2].slice(0, 10).map(async (url) => {
        return await fetch(url[0].url)
          .then(function (res) {
            return res.blob()
          })
          .then(function (video) {
            var url = URL.createObjectURL(video)
            return url
          })
      })
    }
    if (arr1) {
      Promise.all(arr1)
        .then((arregloPromesasResultas1) => {
          setAssetsBlop1(arregloPromesasResultas1)
        }).then(() => {
          var arr2 = assetsApi[2].slice(10).map(async (url) => {
            return await fetch(url[0].url)
              .then(function (res) {
                return res.blob()
              })
              .then(function (video) {
                var url = URL.createObjectURL(video)
                return url
              })
          })
          Promise.all(arr2)
            .then(res => {
              setAssetsBlop2(res)
            })
        })
    }
  }, [assetsApi])

  /*----------------------------------------*/

  //Sacando el email
  if (cookies.get('userInfo')) {
    if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
    else { emailCokkie = cookies.get('userInfo').Items[0].email }
  }

  useEffect(() => {
    if (mode.includes('-') && !cookies.get('userInfo')) history.push('/') // deja jugar solo al de videos si no estas logeado
    if (cookies.get('play')) history.push('/') // para que el usuario no vuelva a jugar cuando llegue al componente final
  }, [])

  // Verifica si esta logeado o no al terminar el juego

  function checkLogin() {
    if (!cookies.get('userInfo')) {
      history.push('/preclose');
    }
    if (cookies.get('userInfo')) {
      history.push('/close');
    }
  }

  // Elige el video/imagen que el usuario va a ver

  function recAssets() {
    if (assetsApi) {
      if (tope.current >= assetsApi[2].length) return null
      else {
        viewAssets();
        dispatch(recVideo(assetsToSeeBlop.current[tope.current]));
        tope.current++;
      }
    }
  }

  // Guarda los videos que el usuario ve

  function viewAssets() {
    dispatch(seenVideos(assetsApi[2], tope.current))
  }

  // Cambio de videos y guarda un nuevo array con los blop

  useEffect(() => {
    if (assetsBlop1) {
      let blop = assetsApi[2].slice(0, 10).map((e, i) => {
        let arr = []
        arr.push({ ...e[0], urlBlop: assetsBlop1[i] }, e[1])
        return arr
      })
      assetsToSeeBlop.current = blop
      recAssets();
    }
  }, [assetsBlop1]);

  useEffect(() => {
    if (assetsBlop2) {
      let blop = assetsApi[2].slice(10).map((e, i) => {
        let arr = []
        arr.push({ ...e[0], urlBlop: assetsBlop2[i] }, e[1])
        return arr
      })
      blop.map(e => {
        assetsToSeeBlop.current.push(e)
      })
    }
  }, [assetsBlop2]);

  return (
    <>
      <div className={style.fondo3}>
        {
          !assetsBlop1 && !assetsToSeeBlop.current ? <Loading /> :
            mode === 'video' || mode === 'video-lt' ? <VideoPlayer className={style.video} videoApi={assetsApi[2]} target={assetsApi[0]} vig={assetsApi[1]} email={emailCokkie} recVideos={recAssets} checkLogin={checkLogin} mood={mood} mode={mode} /> :
              <ImagePlayer className={style.video} imageApi={assetsApi[2]} target={assetsApi[0]} vig={assetsApi[1]} email={emailCokkie} recImages={recAssets} checkLogin={checkLogin} mood={mood} mode={mode} />
        }
      </div>
    </>
  )
}

export default withRouter(Game);
