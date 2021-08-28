import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/share.css'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon
} from 'react-share';

function Share({ url }) {

    return (
        <div className='containerBtnShare' >
            <FacebookShareButton url={'https://tekal-memory-game-front.herokuapp.com/close'} title={'Tekal Memory Game'} hashtag='#memoryGame' >
                <FacebookIcon round size={50}/>
            </FacebookShareButton>
            <TwitterShareButton url={'https://tekal-memory-game-front.herokuapp.com/close'} hashtag='#memoryGame'>
                <TwitterIcon round size={50} />
            </TwitterShareButton>
            <LinkedinShareButton url={'https://tekal-memory-game-front.herokuapp.com/close'} hashtag='#memoryGame' title='Tekal memory game'>
                <LinkedinIcon round size={50} />
            </LinkedinShareButton>
        </div>
    )
}

Share.propTypes = {
    Url: PropTypes.string,
    Titulo: PropTypes.string,
    Resumen: PropTypes.string
};

export default Share


