import React, { useRef, useState } from 'react';
import images from '../../assets/img/images';
import Slider from 'infinite-react-carousel';
import parse from 'html-react-parser';

const ImagePlayer = () => {

    var Et = '';
    const [changeAutoPlay, setChangeAutoPlay] = useState(true);
  
    images.map(res =>{  
      Et = Et + `<div><img src=${res} /></div>\n`;
    });

    const slider = useRef();


    const ensayo = (oldIndex)=>{
        if(oldIndex === images.length -1) slider.current.slickPause();   
    }

    return (
        <div>
            {console.log("entroe" , changeAutoPlay)}
            <Slider 
                autoplay      ={changeAutoPlay}
                ref={slider}
                autoplaySpeed ={2000}
                arrows        = {false}
                arrowsBlock   = {false}
                pauseOnHover  ={false}
                duration      ={100}
                afterChange = {ensayo}
                >
                    {
                        (Et.length !== 0) &&
                        parse(Et)
                    }
            </Slider>
        </div>
    )
}

export default ImagePlayer
