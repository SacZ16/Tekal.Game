import React, { useState, useRef, useEffect } from "react";
import "../Styles/Tutorial.css";
import { Link } from 'react-router-dom'
import slide1 from '../Styles/slideUnoEsp.png'
import slide2 from '../Styles/slideDosEsp.png'
import slide3 from '../Styles/slideTresEsp.png'
import slide4 from '../Styles/slideCuatroEsp.png'
import slide5 from '../Styles/slideCincoEsp.png'
import slide6 from '../Styles/slideSeisEsp.png'
import slide7 from '../Styles/slideSieteEsp.png'
import slide8 from '../Styles/slideOchoEsp.png'
import Cookie from 'universal-cookie'
import HomeIcon from '@material-ui/icons/Home';
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const colors = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8,];

const imagenes = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8,];

const textoCastellanoPrimera = ['Cuando arranque el juego, verás una serie de videos de 3 segundos', 'Tu objetivo es identificar los videos que  se repiten durante la partida', 'Por eso, cuando pienses que un video sale de forma repetida, presiona la tecla ESPACIO', 'Si estás en lo cierto y ese video ya había salido...Bingo! Acertaste', 'Por el contrario, marcaste un video que sale por primera vez... Te equivocaste :(', 'Es importante que prestes atención durante el juego, ya que apareceran algunas repeticiones fáciles de detectar: no olvides presionar la barra espaciadora en esos casos, o perderas una vida!', 'No te equivoques mucho! Solo tienes 3 vidas. Una vez que se acaben, perdiste!', '¿Estas instrucciones quedaron en tu memoria?¡Bien! ¡Ahora, a jugar!']

const textEnglishFirstLine = ['When the game starts, you will see a sequence of short videos', 'Your objective is to identify the repeated videos during the game', 'As soon as you see a repeated video, press SPACEBAR!', 'If you’re correct and the video has appeared before, Bingo! You’re closer to a perfect score!', 'On the other hand, if you marked a video that appeared for the first time... Oops! You made a mistake :)', 'It’s important to pay attention during the whole game, as some easy repeats will appear from time to time: make sure to press SPACEBAR when you spot those, or you will lose a life!', 'Try not to make too many mistakes: you only have N lives! Once they’re gone, you lose the game!', 'Are these instructions well stored in your memory? Great! Lets play!']

const delay = 8500;

function Slideshow() {
  const cookies = new Cookie();

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const [idioma, setIdioma] = useState('Castellano')

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  const mode = localStorage.getItem('mode')
  const playWithOutLogin = () => {
    if (!mode) {
      window.location.href = ('/')
    } else {
      cookies.remove('play')
      window.location.href = ('/game')
    }
  }

   // Traducciones
   if (!localStorage.getItem('idioma')) {
    localStorage.setItem('idioma', 'es')
}

const [language, setLanguage] = useState(localStorage.getItem('idioma'));

const lang = language;

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);
counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */


  return (
    <div className='slideContainer'>
      <a href='/' className='homeIcon' ><HomeIcon style={{color:'white', height:'40px',width:'40px'}}/></a>
      <a href='/game'></a>
      <Link onClick={playWithOutLogin}><button style={{ backgroundColor:'transparent' ,fontSize: '25px', textTransform: 'uppercase', cursor: 'pointer', color: 'white', fontWeight: 'bold', borderStyle: "none", position: 'absolute',bottom:'5%', right:'5%' }}>{mode ? <Translate content="saltar" component="span" />:null}</button></Link>
      <div className="slideshow">
        <div className='tutorial_container'>
          <p className='tekalLogo_tutorial'>TEKAL</p>
          <div className="container_lang_change">
            <button onClick={() => setIdioma('Castellano')}>Es</button>
            <button onClick={() => setIdioma('English')}>En</button>
          </div>
          <div className='tutorial_buttons'>
            <button className='left_btn_tutorial' style={index > 0 ? { color: 'white', cursor: 'pointer' } : { color: 'gray', cursor: 'default' }} onClick={index > 0 ? () => { setIndex(index - 1) } : null}>&#x276e;</button>
            {index < 7 ? <button className='right_btn_tutorial' style={index < 7 ? { color: 'white', cursor: 'pointer' } : { color: 'gray', cursor: 'default' }} onClick={index < 7 ? () => { setIndex(index + 1) } : null}>&#x276f;</button>
              : <Link onClick={playWithOutLogin}><button style={{ fontSize: '25px', textTransform: 'uppercase', cursor: 'pointer', color: 'white', fontWeight: 'bold', borderStyle: "solid", borderColor: 'transparent', borderRadius: '5px', borderWidth: '2px', position: 'absolute' }}>{!mode ?  null : 'Start'}</button></Link>}
          </div>
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {imagenes.map((imagen, index) => (
              <div
                className="slide"
                key={index}
                style={{
                  backgroundImage: `url(${imagen})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  alignContent: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {idioma === 'Castellano' ?

                  <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={index === 5 ? { fontSize: '20px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px' } : { fontSize: '26px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px' }}>{textoCastellanoPrimera[index]}</p>
                    {/* <p style={index===5?{fontSize:'15px'}:{fontSize:'26px'}}>{textoCastellanoSegundaLinea[in,ex]}</p> */}
                  </div>
                  :
                  <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={index === 5 ? { fontSize: '20px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px' } : { fontSize: '26px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px' }}>{textEnglishFirstLine[index]}</p>
                  </div>
                }
              </div>
            ))
            }
          </div>
        </div>

        <div className="slideshowDots">
          {colors.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slideshow;