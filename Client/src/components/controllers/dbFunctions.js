import React, {useState} from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie'



export const SendDataToBACK = async (email, password) => {
    const cookies= new Cookie();
    const objPost = {
        email: email,
        password: password,
    }
    const status= await axios({
        url: 'http://localhost:3001/login',
        method: 'POST',
        data: objPost
    })
    if(status.data.status==400){return alert('usuario o contraseña mal')}
    else if(status.data.status==200){
        cookies.set('userInfo', status.data.userInfo, {
            maxAge: 60,
            path: './'
        });
        window.location.href='./login'
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
    console.log(status.data)
    return status.data
}
