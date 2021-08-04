import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';

const Juego =  () => {

  const recVideo = useSelector(state => state.recVideo);

    return (
        <>
        <div>Render Si o NO</div>
        {/* {
          <div>
            <h1>{state.template[0]}</h1>
            <h1>{state.template[1]}</h1>
          </div>
        } */}
        {   
         (recVideo !== '') &&
         <div width="50%"
         height="50%">
          <ReactPlayer 
            width="50%"
            height="50%"
            url={recVideo.url} 
            playing
            muted
          />
          </div>
}
        </>
    )
}

export default Juego