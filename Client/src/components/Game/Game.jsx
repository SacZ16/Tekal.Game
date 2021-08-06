import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos, userScore } from '../../redux/action';
import { Link } from 'react-router-dom';
import style from '../Game/Game.module.css';

export const Game = () => {

  const dispatch = useDispatch();

  // const template = require('../../assets/level_templates/template_1.json')[2];

  const videos = useSelector(state => state.videos);
  const template = useSelector(state => state.template);

  var tope = 0;
  var interval;

  function recVideos() {
    viewVideos();
    const filterVideo = videos.find(video => video.id === template[tope][0]);
    dispatch(recVideo(filterVideo, tope));
    tope++;
    if (tope >= videos.length) {
      dispatch(userScore({ correct: 0, incorrect: 3 }))
      stopInterval()
    }
  }

  function intervalFunction() {
    interval = setInterval(recVideos, 3000);
  }

  function stopInterval() {
    clearInterval(interval);
  }

  function viewVideos() {
    dispatch(seenVideos(videos));
  }

  useEffect(() => {
    intervalFunction()
  }, [])

  return (
    < >
      <div className={style.fondo2}>

        <Link className={style.Link} to='login'>❌</Link>
        <button onClick={recVideos}>Click</button>
        {
          <VideoPlayer stopInterval={stopInterval} />
        }
      </div>
    </>
  )
}

export default Game;
