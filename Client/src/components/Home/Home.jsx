import React, {useState,  useEffect  } from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainBottomLeft from '../Styles/images/brainBottomLeft.png';
import brainBottomRight from '../Styles/images/brainBottomRight.png';
import brainBack from '../Styles/images/brainBack.png';
import profilePic from '../Styles/images/profilePic.jpg';
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player'
import tutorial from '../Styles/media/tutorial.mp4'
import Cookie from 'universal-cookie'
import '../Styles/home.css';

    const Home = () => {
    const [offset, setOffset] = useState()

    const handleScroll = () => {
        setOffset(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)

    const [show, setShow] = useState(false)
    const [sessionOn, setSessionOn] = useState(false)
    const [login, setLogin] = useState(true)
    const [startGame, setStartGame] = useState(false)
    const [checker, setchecker]=useState(false)
    const cookies= new Cookie();

    if(cookies.get('userInfo')&& !checker){
        setStartGame(true)
        setLogin(false)
        setchecker(true)
    }

    const CurrentSession = () => {
        return(
            <div>
            {sessionOn?
                <div className='sessionBox'>
                <div className='boxDisplay'>
                    <img className='profilePic' src={profilePic} alt='profile_pic'/>
                    <div className='textBox'>
                    <p className='sessionName'>Maximiliano</p>
                    <p className='sessionStatus'>Online</p>
                    </div>
                    <button className='btnOpenSessionMenu' onClick={e => {setShow(!show)}}>&#9660;</button>
                </div>
                {show?
                    <button className='btnLogOut'>Log out</button>:(null)
                }
                </div>:(null)}
            </div> 
        )
    }

    return (
        <div>
        <section>
            <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal'/>
            <img className='stars' src={stars} alt="starsBackground" id='stars' style={{left:(0 + offset * 0.1) + '%'}}/>
            <img className='brainBack' src={brainBack} alt="brainBackground" id='brainBack' style={{width:(100 + offset * -0.2) + '%',left:(-0.5 + offset * -0.1) + '%', bottom:(-18)}}/>
            {startGame?
                <>
                <p className='textHome' style={{top:(0 + offset * -0.1) + '%'}}>Memory Challenge</p>
                <div className='buttonsHome' style={{opacity:(100 + offset * -0.45) + '%', bottom:(25 + offset * -0.1) + '%'}}>
                <div className='startGame'><Link to='/login' style={{color: '#800FC7', fontSize:'15px',textDecoration: 'none', width:'100%', height:'100%', paddingTop:'30px', fontFamily:'Montserrat, sans-serif'}} id='btnStartHome'>Start</Link></div>
                <button className='tutorialHome' id='btnTutorialHome'>Tutorial</button>
                </div>
                </>:(null)}
            <img className='brainsBottom' src={brainBottomLeft} alt="brainsBackground" id='brainsBottomLeft' style={{left:(-1 + offset * -0.1) + '%', bottom:(-7)}}/>
            <img className='brainsBottom' src={brainBottomRight} alt="brainsBackground" id='brainsBottomRight' style={{right:(0 + offset * -0.1) + '%'}}/>
        </section>
        <div className='videoTutorial'><ReactPlayer url={tutorial} height='550px'/></div>
        <div className='text'></div>
        <CurrentSession/>
        {login?
            <>
            <p className='textHome' style={{opacity:(100 + offset * -0.15) + '%', bottom:(50 + offset * -0.1) + '%'}}>Memory Challenge</p>
            <div className='loginHome'><Link to='/login' style={{color: '#800FC7', textDecoration: 'none', width:'100%', height:'100%', paddingTop:'20px',fontFamily:'Montserrat, sans-serif'}}>Log in</Link></div>
            </>
            :(null)}
        </div>
    )
};

export default Home;