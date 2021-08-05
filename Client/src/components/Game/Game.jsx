import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import {recVideo } from '../../redux/action';
import { Link } from 'react-router-dom';

export const Game = () => {

  const dispatch = useDispatch();

  // const template = require('../../assets/level_templates/template_1.json')[2];
  
  const videos = useSelector(state => state.videos);
  const template = useSelector(state => state.template);
  
  var tope=0;
  var intervalo;

  function recVideos() {
        const filterVideo = videos.find(video => video.id === template[tope][0]);
        dispatch(recVideo(filterVideo,tope));
        tope++;
        if (tope>=videos.length-1) {
        clearInterval(intervalo);
    }
  }
  
  function intervalo() {
    intervalo=setInterval(recVideos,3000);
  }

 return (
    < >
        
            <Link to='login'>Volver</Link>
            { intervalo()}
            <VideoPlayer />
  
        
    </>
  )
}

export default Game;
