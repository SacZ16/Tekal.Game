import axios from 'axios';
import Cookie from 'universal-cookie'

export const newCookie= (info)=>{
    const cookies= new Cookie();
    cookies.set('userInfo', info, {
        maxAge: 600,
        path: './'
    });
    if(localStorage.getItem('pruebaa')){
    window.location.href='./preclose'}
    if(!localStorage.getItem('pruebaa')){
    window.location.href='./login'}
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
    console.log(status.data.error)
    if(status.data.error){return alert('usuario o contraseña mal')}
    else if(status){
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

