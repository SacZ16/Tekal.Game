import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function FormRegister() {

    const [userdata, setUserData] = useState({
        Names: '',
        Surnames: '',
        Email: '',
        Password: '',
        Country: '',
        region: '',
        City: '',
        Birth_Day: '',
        Gender: ''
    })
    console.log(userdata)

    const [errors, setErros] = useState('')


    useEffect(() => {
        getCountries()
    }, [])

    const getCountries = async () => {
        const res = await axios.get('http://battuta.medunes.net/api/country/all/?key=963be757a9192190c3f8f86b0a09b89f')
        console.log(res.data)
    }

    const handelChange = (e) => {
        if (e.target.name === 'Confirm_Email' || e.target.name === 'Confirm_Password') {
            console.log('validaciones')
        }
        setUserData({
            ...userdata,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <Link to='login'>Volver</Link>

            <form onChange={handelChange}>
                <label htmlFor="">Names</label>
                <input type="text" name='Names' />
                <br />
                <label htmlFor="">Surnames</label>
                <input type="text" name='Surnames' />
                <br />
                <label htmlFor="">Email</label>
                <input type="text" name='Email' />
                <br />
                <label htmlFor="">Confirm Email</label>
                <input type="text" name='Confirm_Email' />
                {errors && errors}
                <br />

                <label htmlFor="">Password</label>
                <input type="password" name='Password' />
                <br />

                <label htmlFor="">Confirm Password</label>
                <input type="password" name='Confirm_Password' />
                {errors && errors}
                <br />

                <label htmlFor="">Country</label>
                <select name="" id="" name='Country'></select>
                <br />

                <label htmlFor="">Region</label>
                <select name="" id="" name='Region'></select>
                <br />

                <label htmlFor="">City</label>
                <select name="" id="" name='City'></select>
                <br />

                <label>Birth Day</label>
                <input type="date" name='Birth_Day' />
                <br />

                <label>Gender</label>
                <select name="" id="" name='Gender'></select>

                <button>Enviar</button>
            </form>
        </div>
    )
}

export default FormRegister
