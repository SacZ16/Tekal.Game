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

const PreFinalgame = () => {
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
            title: 'Log in',
            html:
                <div style={{ overflow: 'hidden' }}>
                    <RegisterCommonForm props={SendDataToBACK} style={{ posicion: 'absolute' }} />
                    <div style={{ display: 'flex' }}>
                        <a className='signUpText'>Don´t have an account?</a><a style={{ background: 'none' }} onClick={pruebare}>register</a>
                    </div>
                </div>,
            showCloseButton: true,
            showConfirmButton: false
        })
    }
    const pruebare = () => {
        MySwal.fire({
            title: 'Sing up',
            html:
                <div style={{ overflow: 'hidden' }}>
                    <RegisterWithEmail style={{ posicion: 'absolute' }} />
                    <div style={{ display: 'flex' }}>
                        <a className='signUpText'>have an account?</a><a style={{ background: 'none' }} onClick={prueba}>login</a>
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
                <p className="textopreclose">Para poder darte tus resultados,necesitamos que tengas una cuenta</p>
                <img className="imagenpreclose" src={fondomascota} alt="holaa"></img>
                <div className="dvipreclose">
                    <Link className="botnreclose" to='/'>Home</Link>
                    <button className="botnreclose" onClick={pruebare}>Sign up</button>
                    <button className="botnreclose" onClick={prueba}>Log in</button>
                </div>
            </div>
        </div>
    )
};

export default withRouter(PreFinalgame)