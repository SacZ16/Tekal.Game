import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { seenVideos, templateVideos } from '../../redux/action';

// Styles
import style from './Game.module.css';
// Components
import VideoPlayer from '../VideoPlayer/VideoPlayer';
// Array
import videos from '../../assets/videos';

function Game() {

    const sVideos = useSelector(state => state.seenVideos);
    const template = useSelector(state => state.template);

    const dispatch = useDispatch();

    const videoPosition = useRef(0);
    //   console.log("videos: ",template[2][0][videoPosition.current])
    let videosToSeenQuote = useRef([...videos]);
    // console.log(videosToSeenQuote);

    var intervalo;
    // console.log('videos vistos', sVideos);
    // console.log('video actual', videos[videoPosition.current]);
    const currentVideo = template;

    useEffect(() => {

        var aleatorio = Math.round(Math.random()*1000);
         
        const customData = require(`../../assets/level_templates/template_${aleatorio}.json`);

        dispatch(templateVideos(customData));

        // interval();
    }, []);

    function changeVideos() {
        
        if (videoPosition.current >= template[0][2].length - 1) {
            clearInterval(intervalo);
            // console.log('asas');

        } else {
            // dispatch(changeVideo(videos[videoPosition.current].name));
            videoPosition.current++;
            const videoSeen = videosToSeenQuote.current.shift();
            // console.log('video sacado', videoSeen)
            dispatch(seenVideos(videoSeen));
        }
    }

    function interval() {
        intervalo = setInterval(changeVideos, 3000);
    }

    // const [border, setBorder] = useState(false)

    const [border, setBorder] = useState({
        correct: false,
        incorrect: false
    })

    window.addEventListener('keydown', (e) => {
        e.preventDefault()
        if (e.code === 'Space') {
            if (videoPosition.current >= videos.length - 1) console.log('finalizo')
            const target = sVideos.find(e => e.id === videos[videoPosition.current].id)
            // console.log('taget', target)
            if (target) {
                /* setBorder(true)
                setTimeout(() => { setBorder(false) }, 500) */
                setBorder({
                    ...border,
                    correct: true
                })
                setTimeout(() => {
                    setBorder({
                        ...border,
                        correct: false
                    })
                }, 500)
            } else {
                setBorder({
                    ...border,
                    incorrect: true
                })
                setTimeout(() => {
                    setBorder({
                        ...border,
                        incorrect: false
                    })
                }, 500)
            }
        }
    });



    return (
        <div className={style.container}>
            <Link to='login'>Volver</Link>

            {/* <label for="file">File progress:</label>

            <progress id="file" max="100" value={ }> 70% </progress> */}

            <div className={border.correct && style.videoGreen || border.incorrect && style.videoRed}>
                {
                    // sVideos.length !== videos.length - 1 && <VideoPlayer currentVideo={currentVideo} />
                    
                    (template[0])&&
                    template[0][2].map(
                        info=>
                            <div>
                                <VideoPlayer currentVideo={info} />
                            </div>
                        )

                }

                {
                    /*  sVideos.length == videos.length - 1 && < Redirect to='/close' /> */
                }

            </div>
            {
               
            }
        </div>
    )
}

export default Game
