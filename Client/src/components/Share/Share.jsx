import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/share.css'
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
} from 'react-share';

function Share({ url }) {
    const [color, setColor] = useState(false)
    const [color1, setColor1] = useState(false)
    const [color2, setColor2] = useState(false)
    const [color3, setColor3] = useState(false)
    // console.log(url)
    return (
        <div className='containerBtnShare' >
            <FacebookShareButton url={'https://tekal-memory-game-front.herokuapp.com/close'} hashtag='#memoryGame' >
                <FacebookIcon round size={32} iconFillColor={color ? '#C94EBF' : 'white'} onMouseOver={() => setColor(true)} onMouseLeave={(() => setColor(false))} />
            </FacebookShareButton>
            <TwitterShareButton url={'https://www.google.com/'} title={'Tekal Memory Game'} hashtag='#memoryGame'>
                <TwitterIcon round size={32} iconFillColor={color1 ? '#C94EBF' : 'white'} onMouseOver={() => setColor1(true)} onMouseLeave={(() => setColor1(false))} />
            </TwitterShareButton>
        </div>
    )
}

Share.propTypes = {
    Url: PropTypes.string,
    Titulo: PropTypes.string,
    Resumen: PropTypes.string
};

export default Share


