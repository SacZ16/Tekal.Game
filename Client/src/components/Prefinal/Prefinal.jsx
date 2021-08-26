import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../Styles/prefinal.css';
import logoTekal from '../Styles/tekalLogo.png';
import RegisterCommonForm from '../Signin/LoginCommonForm';
import Cookie from 'universal-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SendDataToBACK } from '../controllers/dbFunctions'
import RegisterWithEmail from '../Signin/RegisterEmail';
import fondomascota from '../Styles/prefinalmascota.png'
import Loading from '../Loading/Loading';
// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

const PreFinalgame = () => {

    // Traducciones

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */
    const MySwal = withReactContent(Swal)
    const cookies = new Cookie();
    useEffect(() => {
        if (cookies.get('userInfo')) {
            window.location.href = './close'
        }
    })
    if (cookies.get('userInfo')) { return window.location.href = './close' }

    const prueba = () => {
        MySwal.fire({
            title: <p style={{ color: 'white', marginBottom: 0, fontFamily: 'Montserrat, sans-serif' }}>{<Translate content="botonLogin" component="span" />}</p>,
            html:
                <div style={{ overflow: 'hidden' }}>
                    <RegisterCommonForm props={SendDataToBACK} style={{ posicion: 'absolute' }} />
                    <div style={{ display: 'flex' }}>
                        <a className='signUpText'>{<Translate content="noTienesUnaCuenta" component="span" />}&nbsp;</a><a style={{ background: 'none', marginTop: '15px', color: 'white', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }} onClick={pruebare}>{<Translate content="botonRegistro" component="span" />}</a>
                    </div>
                </div>,
            showCloseButton: true,
            showConfirmButton: false
        })
    }
    const pruebare = () => {
        MySwal.fire({
            title: <p style={{ color: 'white', marginBottom: 0, fontFamily: 'Montserrat, sans-serif' }}>{<Translate content="botonRegistro" component="span" />}</p>,
            html:
                <div style={{ overflow: 'hidden' }}>
                    <RegisterWithEmail style={{ posicion: 'absolute' }} />
                    <div style={{ display: 'flex' }}>
                        <a className='signUpText'>{<Translate content="yaTienesUnaCuenta" component="span" />}&nbsp;</a><a style={{ background: 'none', marginTop: '15px', color: 'white', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }} onClick={prueba}>{<Translate content="botonLogin" component="span" />}</a>
                    </div>
                </div>,
            showCloseButton: true,
            showConfirmButton: false
        })
    }


    return (
        <div className="fondopreclose">
            <img className="logotekalpreclose" src={logoTekal} alt="" />
            <div className="fondoprefinal">
                <img className="imagenpreclose" src={fondomascota} alt="img_mascota"></img>
                <div className='column_right_preclose'>
                    <p className="textopreclose">{<Translate content="textoNoLogeado" component="span" />}</p>
                    <div className="buttonsPreclose">
                        <button className="btnPreclose" onClick={pruebare}>{<Translate content="botonRegistro" component="span" />}</button>
                        <button className="btnPreclose" onClick={prueba}>{<Translate content="botonLogin" component="span" />}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withRouter(PreFinalgame)