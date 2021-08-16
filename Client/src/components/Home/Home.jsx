import React, { useState, useEffect } from 'react';
import logoTekal from '../Styles/tekalLogo.png';
import stars from '../Styles/images/stars.png';
import brainBottomLeft from '../Styles/images/brainBottomLeft.png';
import brainBottomRight from '../Styles/images/brainBottomRight.png';
import { Link } from 'react-router-dom';
import Cookie from 'universal-cookie'
import '../Styles/home.css';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import RegisterWithEmail from '../Signin/RegisterEmail';
import Swal from 'sweetalert2'

import Tutorial from '../Tutorial/Tutorial'

const Home = () => {
    const [offset, setOffset] = useState()

    const handleScroll = () => {
        setOffset(window.pageYOffset)
    }

    window.addEventListener('scroll', handleScroll)
    const mostrarLogin = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Log in',
            html:
                '<div class="row">'+
                   '<div class="column" >'+
                   '<div class="asdasdd">'+
                   '<p class="dddd">Name</p>'+
                   '<input class="swal2-inputmh4"/>'+
                   '<p class="dddd">Date of bith</p>'+
                   '<input class="swal2-inputmh4"/>'+
                   '<p class="dddd">Country</p>'+
                   '<input class="swal2-inputmh4"/>'+
                   '<p class="dddd">Password</p>'+
                   '<input class="swal2-inputmh4"/>'+
                   '<p class="dddd">Genero</p>'+
                   '<input class="swal2-inputmh4"/>'+
                    '</div>'+
                    '</div>'+
                    '<div class="column" >'+
                    '<div class="asdasdd">'+
                    '<p class="dddd">Last Name</p>'+
                    '<input class="swal2-inputmh4"/>'+
                    '<p class="dddd">Email</p>'+
                    '<input class="swal2-inputmh4"/>'+
                    '<p class="dddd">City/state</p>'+
                    '<input class="swal2-inputmh4"/>'+
                    '<p class="dddd">Confirm Password</p>'+
                    '<input class="swal2-inputmh4"/>'+
                    '<p class="dddd">Ethnicity</p>'+
                    '<input class="swal2-inputmh4"/>'+
                    '</div>'+
                '</div>',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })

        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
        }
    }
    const [show, setShow] = useState(false)
    const [sessionOn, setSessionOn] = useState(false)
    const [login, setLogin] = useState(true)
    const [startGame, setStartGame] = useState(false)
    const [checker, setchecker] = useState(false)

    //estados de css
    const [popUpLoginAux, setPopUpLoginAux] = useState('none')
    const [popUpRegisterAux, setPopUpRegisterAux] = useState('none')
    const [blurFondo, setBlurFondo] = useState('0px')

    const cookies = new Cookie();

    const popUpRegister = () => {
        setPopUpRegisterAux('flex')
        setBlurFondo('2px')
    }

    const popUpLogin = () => {
        setPopUpLoginAux('flex')
        setBlurFondo('2px')
    }

    if (cookies.get('userInfo') && !checker) {
        setStartGame(true)
        setLogin(false)
        setSessionOn(true)
        setchecker(true)
    }

    const CurrentSession = () => {
        return (
            <div >
                {sessionOn ?
                    <div className='sessionBox'>
                        <div className='boxDisplay'>
                            <img className='profilePic' src='https://clinicacontraadicciones.mx/wp-content/uploads/2020/10/TESTIMONIO.jpg' alt='profile_pic' />
                            <div className='textBox'>
                                <p className='sessionName'>Maximiliano</p>
                                <p className='sessionStatus'>Online</p>
                            </div>
                            <button className='btnOpenSessionMenu' onClick={e => { setShow(!show) }}>&#9660;</button>
                        </div>
                        {show ?
                            <button className='btnLogOut' onClick={() => {
                                cookies.remove('userInfo')
                                window.location.href = ('')
                            }}>Log out</button> : (null)
                        }
                    </div> : (null)}
            </div>
        )
    }

    return (
        <>
            <div className='formulario_register' style={{ display: `${popUpLoginAux}`, zIndex: '10000', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <div style={{ width: '500px', height: '85%' }}><RegisterCommonForm /></div>{/* Este es el formulario LOGIN */}
            </div>

            <div className='formulario_register' style={{ display: `${popUpRegisterAux}`, zIndex: '10000', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <div style={{ width: '500px', height: '85%' }}><RegisterWithEmail /></div>
            </div>

            <div className='homeDiv' style={blurFondo === '2px' ? { filter: `blur(${blurFondo}) brightness(90%)`, overflowY: 'hidden', transform: 'scale(1.1)' } : null}>
                <section>
                    <img className='logoTekal' src={logoTekal} alt="Logo de Tekal" id='logoTekal' />
                    <img className='stars' src={stars} alt="starsBackground" id='stars' style={{ left: (0 + offset * 0.1) + '%' }} />
                    {startGame ?
                        <>
                            <p className='textHome' style={{ opacity: (100 + offset * -0.15) + '%', bottom: (50 + offset * -0.1) + '%' }}>Discover how good <br /> is your <span className='memory_style'>memory</span></p>
                            <p className='sub_textHome' style={{ opacity: (100 + offset * -5) + '%' }}>It takes only 10 min to discover how good is your memory.<br /> Are you ready?</p>
                            <div className='buttonsHome' style={{ opacity: (100 + offset * -0.45) + '%', bottom: (25 + offset * -0.1) + '%' }}>
                                <div className='startGame'><Link to='/game' style={{ color: '#800FC7', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='btnStartHome'>Start</Link></div>
                            </div>
                        </> : (null)}
                    <img className='brainsBottom' src={brainBottomLeft} alt="brainsBackground" id='brainsBottomLeft' style={{ left: (-1 + offset * -0.1) + '%', bottom: (-7) }} />
                    <img className='brainsBottom' src={brainBottomRight} alt="brainsBackground" id='brainsBottomRight' style={{ right: (0 + offset * -0.1) + '%' }} />
                </section>

                <CurrentSession />
                {login ?
                    <>
                        <p className='textHome' style={{ opacity: (100 + offset * -0.15) + '%', bottom: (50 + offset * -0.1) + '%' }}>Discover how good <br /> is your <span className='memory_style'>memory</span></p>
                        <p className='sub_textHome' style={{ opacity: (100 + offset * -5) + '%' }}>It takes only 10 min to discover how good is your memory.<br /> Are you ready?</p>
                        <div className='container_buttons_home'>
                            <button className='registerHome' onClick={() => popUpRegister()}>Sign up</button>
                            <button className='loginHome' onClick={() => popUpLogin()}>Log in</button>
                        </div>
                    </>
                    : (null)}
            </div>

            <div className='second_screen_home'>
                <div className='startGameLanding'><Link to='/game' style={{ color: '#800FC7', fontSize: '15px', textDecoration: 'none', width: '100%', height: '100%', paddingTop: '30px', fontFamily: 'Montserrat, sans-serif' }} id='btnStartHome'>Start</Link></div>
                <Tutorial />
            </div>

        </>
    )
};

export default Home;