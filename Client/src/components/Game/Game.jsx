import React, { useEffect, useRef, useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import { recVideo, seenVideos, userScore } from '../../redux/action';
import { Link, Redirect } from 'react-router-dom';

export const Game = () => {

  const dispatch = useDispatch();

  // const template = require('../../assets/level_templates/template_1.json')[2];

  const videos = useSelector(state => state.videos);
  const template = useSelector(state => state.template);
  const sVideos = useSelector(state => state.seenVideos)
  console.log(sVideos)

  /* let videosToSeenQuote = useRef()
  videosToSeenQuote.current = [...videos]
  console.log(videosToSeenQuote.current) */

  var tope = 0;
  var intervalo;

  function recVideos() {

    viewVideos()
    const filterVideo = videos.find(video => video.id === template[tope][0]);
    dispatch(recVideo(filterVideo, tope));
    tope++;
    if (tope >= videos.length - 1) {
      dispatch(userScore({ correct: 0, incorrect: 3 }))
      clearInterval(intervalo);
    }
  }

  function intervalo() {
    intervalo = setInterval(recVideos, 3000);
  }

  function viewVideos() {
    // console.log(videosToSeenQuote.current)

    // const viewVideo = videosToSeenQuote.current.shift()
    dispatch(seenVideos(videos))
  }

  /* useEffect(() => {
    intervalo()
  }, []) */

  return (
    < >

      <Link to='login'>Volver</Link>
      <button onClick={recVideos}>Click</button>
      {/* {intervalo()} */}
      {tope >= videos.length - 1 ? <Redirect to='close' /> :
        <VideoPlayer />
      }
    </>
  )
}

export default Game;
