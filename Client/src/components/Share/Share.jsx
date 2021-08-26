import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/share.css'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';

function Share({ url }) {
    const [color, setColor] = useState(false)
    const [color1, setColor1] = useState(false)
    const [color2, setColor2] = useState(false)
    const [color3, setColor3] = useState(false)
    const [color4, setColor4] = useState(false)
    const [color5, setColor5] = useState(false)
    // console.log(url)
    return (
        <div className='containerBtnShare' >
            <FacebookShareButton url={'https://tekal-memory-game-front.herokuapp.com/close'} >
                <FacebookIcon round size={32} iconFillColor={color ? '#C94EBF' : 'white'} onMouseOver={() => setColor(true)} onMouseLeave={(() => setColor(false))} />
            </FacebookShareButton>
            <TwitterShareButton url={'https://www.google.com/'} title={'this.props.Titulo'}>
                <TwitterIcon round size={32} iconFillColor={color1 ? '#C94EBF' : 'white'} onMouseOver={() => setColor1(true)} onMouseLeave={(() => setColor1(false))} />
            </TwitterShareButton>
            <TelegramShareButton url={'https://www.google.com/'} >
                <TelegramIcon round size={32} iconFillColor={color2 ? '#C94EBF' : 'white'} onMouseOver={() => setColor2(true)} onMouseLeave={(() => setColor2(false))} />
            </TelegramShareButton>
            <EmailShareButton body={'Mira mi puntuacion'} >
                <EmailIcon round size={32} iconFillColor={color3 ? '#C94EBF' : 'white'} onMouseOver={() => setColor3(true)} onMouseLeave={(() => setColor3(false))} />
            </EmailShareButton>
            <LinkedinShareButton url={'https://www.google.com/'} title='Prueba'>
                <LinkedinIcon round size={32} iconFillColor={color4 ? '#C94EBF' : 'white'} onMouseOver={() => setColor4(true)} onMouseLeave={(() => setColor4(false))} />
            </LinkedinShareButton>
            <WhatsappShareButton url={'https://www.google.com/'} >
                <WhatsappIcon round size={32} iconFillColor={color5 ? '#C94EBF' : 'white'} onMouseOver={() => setColor5(true)} onMouseLeave={(() => setColor5(false))} />
            </WhatsappShareButton>
        </div>
    )
}

Share.propTypes = {
    Url: PropTypes.string,
    Titulo: PropTypes.string,
    Resumen: PropTypes.string
};

export default Share


