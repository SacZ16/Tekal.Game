import axios from 'axios';
import Cookie from 'universal-cookie'

export const newCookie = (info) => {
    const cookies = new Cookie();
    cookies.set('userInfo', info, {
        maxAge: 6000,
        path: './'
    });
    if (localStorage.getItem('pruebaa')) {
        window.location.href = './preclose'
    }
    if (!localStorage.getItem('pruebaa')) {
        window.location.href = './'
    }
}
export const SendDataToBACK = async (email, password) => {
    let err = ''
    const objPost = {
        email: email,
        password: password,
    }
    const status = await axios({
        url: 'http://localhost:3001/login',
        method: 'POST',
        data: objPost
    })
    if (status.data.error) {
        err = 'User or Password wrong'
        return err
    }
    else if (status) {
        // if(!status.data[0].VerificationEmail){return alert('Verifica tu Email para continuar')}
        newCookie(status.data)
    }
}
export const SendDataGoogle = async (obj) => {
    const objPost = {
        email: obj.email,
        name: obj.name
    }
    const status = await axios({
        url: 'http://localhost:3001/logingoogle',
        method: 'POST',
        data: objPost
    })
    newCookie(await status.data)
    return status.data
}

