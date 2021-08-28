import React, { useState, useRef, useEffect } from "react";
import "../Styles/Tutorial.css";
import { Link } from 'react-router-dom'
import slide1 from '../Styles/slideUnoEsp.png'
import slide2 from '../Styles/slideDosEsp.png'
import slide3 from '../Styles/slideTresEsp.png'
import slide4 from '../Styles/slideCuatroEsp.png'
import slide8 from '../Styles/slideOchoEsp.png'
import Cookie from 'universal-cookie'
import HomeIcon from '@material-ui/icons/Home';
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const colors = [slide1, slide2, slide3,slide8, slide4];

const imagenes = [slide1, slide2, slide3,slide8, slide4];

const textoCastellanoPrimera = ['Sabia que volverias, eres valiente! Bienvenido al modo de juego más difícil de todos.','Esta vez, no verás repeticiones dentro del mismo nivel, sino que ciertas imagenes que aparecerán te fueron mostradas durante una partida anterior.','Cuando reconozcas una de esas imagenes, ¡presiona ESPACIO!','Preparate y haz memoria. Trata de recordar lo que viste durante las partidas anteriores.','¿Estas listo? ¡A jugar!']

const textEnglishFirstLine = [`I knew you'd be back. You're one of the brave ones! Welcome to the hardest game mode.`,`This time, you won't see repetitions inside a level; instead, some of the images you'll be shown are images that you've seen in a previous game.`,`Your objective is to detect those images. When you see one, press SPACEBAR!`,`Dig through your brain and try to remember what you saw last time.`,`Are you ready? Let's play!`]

const delay = 8500;

function TutorialLongTermVideo () {
  const cookies = new Cookie();

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const [idioma, setIdioma] = useState(localStorage.getItem('idioma'))

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
      {localStorage.getItem('lastScore')? <Link onClick={playWithOutLogin}><button onClick={localStorage.setItem('mode', 'image-lt')} style={{ backgroundColor:'transparent' ,fontSize: '25px', textTransform: 'uppercase', cursor: 'pointer', color: 'white', fontWeight: 'bold', borderStyle: "none", position: 'absolute',bottom:'5%', right:'5%' }}>{mode ? <Translate content="saltar" component="span" />:null}</button></Link>:null}
      <div className="slideshow">
        <div className='tutorial_container'>
        {localStorage.getItem('idioma') === 'es' ? 
          <select className="Header-lang" onChange={(e) => setIdioma(e.target.value)}>
            <option value='es' onClick={() => setIdioma('es')}>Es</option>
            <option value='en' onClick={() => setIdioma('en')}>En</option>
          </select>
          :
          <select className="Header-lang" onChange={(e) => setIdioma(e.target.value)}>
            <option value='en' onClick={() => setIdioma('en')}>En</option>
            <option value='es' onClick={() => setIdioma('es')}>Es</option>
          </select>
          }
          
          <div className='tutorial_buttons'>
            <button className='left_btn_tutorial' style={index > 0 ? { color: 'white', cursor: 'pointer' } : { color: 'gray', cursor: 'default' }} onClick={index > 0 ? () => { setIndex(index - 1) } : null}>&#x276e;</button>
            {index < 4 ? <button className='right_btn_tutorial' style={index < 4 ? { color: 'white', cursor: 'pointer' } : { color: 'gray', cursor: 'default' }} onClick={index < 4 ? () => { setIndex(index + 1) } : null}>&#x276f;</button>
              : localStorage.getItem('lastScore')? <Link onClick={playWithOutLogin}><button onClick={localStorage.setItem('mode', 'image-lt')} style={{ fontSize: '25px', textTransform: 'uppercase', cursor: 'pointer', color: 'white', fontWeight: 'bold', borderStyle: "solid", borderColor: 'transparent', borderRadius: '5px', borderWidth: '2px', position: 'absolute' }}>{!mode ?  null : 'Start'}</button></Link>:null}
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
                {idioma === 'es' ?

                  <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={index === 1 ? { fontSize: '20px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', paddingRight:'30px', paddingLeft:'30px' } : { fontSize: '26px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', paddingRight:'30px', paddingLeft:'30px' }}>{textoCastellanoPrimera[index]}</p>
                    {/* <p style={index===5?{fontSize:'15px'}:{fontSize:'26px'}}>{textoCastellanoSegundaLinea[in,ex]}</p> */}
                  </div>
                  :
                  <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={index === 1 ? { fontSize: '20px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', paddingRight:'30px', paddingLeft:'30px' } : { fontSize: '26px', whiteSpace: 'normal', width: '65%', background: '#E7E7E7', color: 'black', borderRadius: '10px', paddingTop: '10px', paddingBottom: '10px', paddingRight:'30px', paddingLeft:'30px' }}>{textEnglishFirstLine[index]}</p>
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

export default TutorialLongTermVideo;