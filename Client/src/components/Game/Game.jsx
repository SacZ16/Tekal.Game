import React, { useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import style from './Game.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {recVideo } from '../../redux/action';
import { Link } from 'react-router-dom';

export const App = () => {

  const dispatch = useDispatch();

  const template = require('../../assets/level_templates/template_1.json')[2];

  console.log(template.length);
  
  const videos = useSelector(state => state.videos);
  
  var tope=0;
  var intervalo;

//   function changeVideos() {
//     dispatch(changeVideo(videos[tope].name));
//     tope++;
//     if (tope>=7) {
//     clearInterval(intervalo);
//   }
//   }
//   function changeTemplates() {
//     dispatch(changeTemplate(template[tope]));
//     tope++;
//     if (tope>=7) {
//     clearInterval(intervalo);
//   }
//   }

  function recVideos() {
        dispatch(recVideo(videos[tope]));
        tope++;
        if (tope>=videos.length-1) {
        clearInterval(intervalo);
    }
  }
  
  function intervalo() {
    intervalo=setInterval(recVideos,3000);
  }

  const [border, setBorder] = useState({
    correct: false,
    incorrect: false
})

    // window.addEventListener('keydown', (e) => {
    //     e.preventDefault();
    //     if (e.code === 'Space') {
    //         // if (videoPosition.current >= videos.length - 1) console.log('finalizo')
    //         // const target = sVideos.find(e => e.id === videos[videoPosition.current].id)
    //         // console.log('taget', target)
    //         if (true) {
    //             /* setBorder(true)
    //             setTimeout(() => { setBorder(false) }, 500) */
    //             setBorder({
    //                 ...border,
    //                 correct: true
    //             })
    //             setTimeout(() => {
    //                 setBorder({
    //                     ...border,
    //                     correct: false
    //                 })
    //             }, 500)
    //         } 
            // else {
            //     setBorder({
            //         ...border,
            //         incorrect: true
            //     })
            //     setTimeout(() => {
            //         setBorder({
            //             ...border,
            //             incorrect: false
            //         })
            //     }, 500)
            // }
    //     }
    // });
    const handlerContainer = (e)=>{
        console.log("entro");
        console.log(e);
    }
  return (
    < >
        <form onKeyPress={handlerContainer}>
            <Link to='login'>Volver</Link>
            <div className={(border.correct)?style.videoGreen:'' || 
                            (border.incorrect)?style.videoRed:''
                            }>
                { intervalo()}
                <VideoPlayer />
            </div>
        </form>
        
    </>
  )
}

export default App;
