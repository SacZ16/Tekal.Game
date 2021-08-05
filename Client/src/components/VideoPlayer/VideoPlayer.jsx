import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import style from '../Game/Game.module.css';

const VideoPlayer =  () => {

  const {recVideo,template} = useSelector(state => state);

  const infoVideo = useRef();

  infoVideo.current = recVideo;

  const infoTemplate = useRef();

  infoTemplate.current = template;

  const [border, setBorder] = useState({
    correct: false,
    incorrect: false
  })

  const handleKeyDown = (event) => {
    
    // console.log('A key was pressed', event.keyCode);
    if (event.keyCode === 32) {
      // if (videoPosition.current >= videos.length - 1) console.log('finalizo')
      // const target = sVideos.find(e => e.id === videos[videoPosition.current].id)
      // console.log('taget', target)
      
          // console.log("recVideo",ref.current.infoVideo.type); 
          const concat = infoVideo.current.infoVideo.type + "_repeat";

        if(concat === template[infoVideo.current.filter][1]){
          console.log("verdadero");
          setBorder({
            correct: true,
            incorrect:false
          });
        }   
        else{
          console.log("falso");
          setBorder({
            correct: false,
            incorrect:true
          });
        }
        setTimeout(() => {
          setBorder({
            correct: false,
            incorrect:false
          });
      }, 500)

              // if(ref.current.infoVideo.type === "target_repeat")
              //     console.log("verde");

              if (true) {
          
              }else{
             
              }
        }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
      <>
      {
        <div className={
          (border.correct) ? style.videoGreen:''||
          (border.incorrect)? style.videoRed:''
          }>
          {(recVideo !== '') &&
            <div  width="50%"
                  height="50%">
                  <ReactPlayer
                      width="50%"
                      height="50%"
                      url={recVideo.infoVideo.url}
                      playing
                      muted
                  />
              <div>{recVideo.infoVideo.id} {recVideo.infoVideo.type} </div>
              <br/> 
              <div>{template[infoVideo.current.filter]}</div>   
              </div>
        }
        </div>
      }
      </>
  )
}

export default VideoPlayer