import React, {useState} from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie'


export const newCookie= (info)=>{
    const cookies= new Cookie();
    cookies.set('userInfo', info, {
        maxAge: 60,
        path: './'
    });
    window.location.href='./login'
}
export const SendDataToBACK = async (email, password) => {

    const objPost = {
        email: email,
        password: password,
    }
    const status= await axios({
        url: 'http://localhost:3001/login',
        method: 'POST',
        data: objPost
    })
    if(status.data.error){return alert('usuario o contraseña mal')}
    else if(status){
        if(!status.data[0].VerificationEmail){return alert('Verifica tu Email para continuar')}
        newCookie(status.data)
    }
}
export const SendDataGoogle = async (email) => {
    const objPost = {
        email: email
    }
    const status= await axios({
        url: 'http://localhost:3001/logingoogle',
        method: 'POST',
        data: objPost
    })
    newCookie(await status.data)
    return status.data
}

