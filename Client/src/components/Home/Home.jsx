import React, {useState,  useEffect  } from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainsBottom from '../Styles/images/brainsBottom.png';
import brainBack from '../Styles/images/brainBack.png';
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player'
import tutorial from '../Styles/media/tutorial.mp4'
import Cookie from 'universal-cookie'
import '../Styles/home.css';




const Home = () => {
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
                <div>
                    <img src='' alt='profile_pic'/>
                    <p>Pepito</p>
                    <p>Online</p>
                    <button onClick={e => {setShow(!show)}}>abrir</button>
                {show?
                    <button>Log out</button>:(null)
                }
                </div>:(null)}
            </div> 
        )
    }

    const script = () => {
        let stars = document.getElementById('stars')
        let light = document.getElementById('light')
        let brainBack = document.getElementById('brainBack')
        let brainsBottom = document.getElementById('brainsBottom')

        window.addEventListener('scroll', function(){
        let value = window.scrollY;
        stars.style.left = value * 0.25 * 'px';
    })
    }

   

    return (
        <div>
        <section>
            <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal'/>
            <img className='stars' src={stars} alt="starsBackground" id='stars'/>
            <img className='brainBack' src={brainBack} alt="brainBackground" id='brainBack'/>
            {startGame?
                <>
                <p className='textHome'>Memory Challenge</p>
                <div className='buttonsHome'>
                <div className='startGame'><Link to='/login' style={{color: 'white', textDecoration: 'none'}} id='btnStartHome'>Start</Link></div>
                <button className='tutorialHome' id='btnTutorialHome'>Tutorial</button>
                </div>
                </>:(null)}
            <img className='brainsBottom' src={brainsBottom} alt="brainsBackground" id='brainsBottom'/>
        </section>
        <div className='videoTutorial'><ReactPlayer url={tutorial} height='550px'/></div>
        <div className='text'></div>
        
        {script}
        <CurrentSession/>
        {login?
            <>
            <p className='textHome'>Welcome to Memory Challenge</p>
            <div className='loginHome'><Link to='/login' style={{color: '#800FC7', textDecoration: 'none'}}>Log in</Link></div>
            </>
            :(null)}
       
        </div>
    )
};

export default Home;