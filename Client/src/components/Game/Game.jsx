import { useEffect, useState, useRef } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import ImagePlayer from '../ImagePLayer/ImagePlayer';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos } from '../../redux/action';
import style from '../Styles/Game.module.css'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { withRouter } from 'react-router';

// Simulamos el array de imagenes
import imagePueba from '../../assets/img/imagesPrueba';


export const Game = ({ history }) => {

  const dispatch = useDispatch();
  // const { score } = useSelector(state => state.user.currentGame)
  const tope = useRef(0)
  const mood = localStorage.getItem('mood')
  const mode = localStorage.getItem('mode')
  const [infoUser, SetInfoUser] = useState('')
  var emailCokkie;
  const cookies = new Cookie();

  const [assetsApi, setAssetsApi] = useState() // videos/imagenes provenientes de la base de datos
  console.log(assetsApi)
  const [assetsBlop, setAssetsBlop] = useState() // array con las URL convertidas
  // console.log(assetsBlop)
  const assetsToSeeBlop = useRef() // videos con la URL Blop
  // console.log(assetsToSeeBlop.current)

  useEffect(() => {
    if (!assetsApi) {
      axios.post('http://localhost:3001/links', {
        email: emailCokkie,
        mode: mode
      })
        .then(res => {
          setAssetsApi(res.data)
        })
      }
      if (assetsApi) {
        var arregloPromesas = assetsApi[2].map(async (url) => {
          return await fetch(url[0].url)
          .then(function (res) {
            return res.blob()
          })
          .then(function (video) {
            var url = URL.createObjectURL(video)
            return url
          })
        })
        Promise.all(arregloPromesas)
        .then((arregloPromesasResultas) => {
          setAssetsBlop(arregloPromesasResultas)
        })
      }
    }, [assetsApi])
    
    const [buffer, setBuffer] = useState() // de prueba guarda las imagenes

  useEffect(() => {
    if (!assetsApi) {
      axios.post('http://localhost:3001/links', {
        email: emailCokkie,
        mode: mode
      })
        .then(res => {
          setAssetsApi(res.data)
        })
    }
    if (assetsApi) {
      var arr1 = assetsApi[2].slice(0, 100).map(async (url) => {
        return await fetch(url[0].url)
          .then(function (res) {
            return res.blob()
          })
          .then(function (video) {
            var url = URL.createObjectURL(video)
            setBuffer(url)
          })
      })
      var arr2 = assetsApi[2].slice(101).map(async (url) => {
        return await fetch(url[0].url)
          .then(function (res) {
            return res.blob()
          })
          .then(function (video) {
            var url = URL.createObjectURL(video)
            setBuffer(url)
          })
      })

    }
    if (buffer && buffer.length !== assetsApi[2].length) {
      Promise.all(buffer)
        .then((arregloPromesasResultas) => {
          setAssetsBlop(arregloPromesasResultas)
        })
      pos1 *= 10
      pos2 *= 10
    }
  }, [assetsApi, buffer])

  /*----------------------------------------*/

  //Sacando el email
  if (cookies.get('userInfo')) {
    if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
    else { emailCokkie = cookies.get('userInfo').Items[0].email }
  }

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

  useEffect(() => {
    if (mode !== 'video' && !cookies.get('userInfo')) history.push('/') // deja jugar solo al de videos si no estas logeado
    // if (score) history.push('/') // para que el usuario no vuelva a jugar cuando llegue al componente final
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

  // Elige el video que el usuario va a ver

  function recVideos() {
    // console.log(assetsToSeeBlop.current)
    if (assetsApi) {
      if (tope.current >= assetsApi[2].length) return null
      else {
        viewVideos();
        dispatch(recVideo(assetsToSeeBlop.current[tope.current]));
        // dispatch(recVideo(assetsToSeeBlop2.current[tope.current2]));
        tope.current++;
      }
    }
  }

  // Guarda los videos que el usuario ve

  function viewVideos() {
    dispatch(seenVideos(assetsApi[2], tope.current))
  }

  // Cambio de videos y guarda un nuevo array con los blop

  useEffect(() => {
    if (assetsBlop) {
      let blop = assetsApi[2].map((e, i) => {
        let arr = []
        arr.push({ ...e[0], urlBlop: assetsBlop[i] }, e[1])
        return arr
      })
      // console.log(blop)
      assetsToSeeBlop.current = blop
    }
    recVideos();
  }, [assetsBlop]);

  return (
    < >
      <div className={style.fondo3}>
        {
          !assetsBlop && !assetsToSeeBlop.current ? <Loading /> :
            mode === 'video' && assetsBlop && !assetsToSeeBlop.current ? <VideoPlayer className={style.video} videoApi={assetsApi[2]} target={assetsApi[0]} email={emailCokkie} recVideos={recVideos} checkLogin={checkLogin} mood={mood} /> :
              <ImagePlayer className={style.video} imageApi={assetsApi[2]} target={assetsApi[0]} email={emailCokkie} recImages={recVideos} checkLogin={checkLogin} mood={mood} />
        }
      </div>
    </>
  )
}

export default withRouter(Game);
