import React, { useState } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie'
import getCity from '../geoLocalitation/geoLocalitation'
import { newCookie } from '../controllers/dbFunctions';
import '../Styles/formularyDataExtra.css';

import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"


const FormData = () => {

    const cookies = new Cookie();
    const [err, setErr] = useState('')

    
    const [countrytext, setcountrytext] = useState('')
    const [citytext, setscitytext] = useState('')

    const country = getCity()
    const [input, setInput] = useState({
        age: "",
        gender: "",
        ethnicity: "",
    })
    let emailCokkie = ''
    if (!cookies.get('userInfo').Items) { emailCokkie = cookies.get('userInfo')[0].email }
    else { emailCokkie = cookies.get('userInfo').Items[0].email }

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    if(country.country && !countrytext.length) {
        setcountrytext(country.country)
    }
    if(country.city && !citytext.length) {
        setscitytext(country.city)
    }

    const SendToBackEnd = async () => {
        const user = {
            email: emailCokkie,
            country: countrytext,
            age: input.age,
            city: citytext,
            gender: input.gender,
            ethnicity: input.ethnicity,
        }
        if (!input.gender.length) {
            setErr('Completa los campos')
        }
        else {var response = await axios.post(`${process.env.REACT_APP_API_URL}addinfo`, user)} ///Eliseo PONE LA RUTA DE BACK ACA XD
        if (response.data === 'campos incompletos') {
            setErr('Completa los campos')
        }
        else {
            if (localStorage.getItem('results')) {
                window.location.href = ('/close')
            } else {
                // cookies.remove('userInfo')
                window.location.href = ('')
            }
        }
    }

    // Traducciones
    if (!localStorage.getItem('idioma')) {
        localStorage.setItem('idioma', 'es')
    }

    const handleChange = (e) => {
        localStorage.setItem('idioma', `${e.target.value}`)
        setLanguage(localStorage.getItem('idioma'))
    }

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    var preferNotToSay = ''
    var male = ''
    var female = ''
    var nonBinary = ''
    var white = ''
    var africanAmerican = ''
    var nativeAmerican = ''
    var pacificIslander = ''
    var asian = ''
    var nativeHawaiian = ''
    var latino = ''

    if(localStorage.getItem('idioma') === 'en'){
        var idioma = true
    }
    if(localStorage.getItem('idioma') === 'es'){
        idioma = false
    }
    
    if(idioma) {
        preferNotToSay = 'Prefer not to say'
        male = 'Male'
        female = 'Female'
        nonBinary = 'Non binary'
        white = 'White'
        africanAmerican = 'African American'
        nativeAmerican = 'Native American/Alaskan Native'
        pacificIslander = 'Pacific Islander'
        asian = 'Asian'
        nativeHawaiian = 'Native Hawaiian'
        latino = 'Latino or Hispanic'

    }

    if(!idioma) {
        preferNotToSay = 'Prefiero no decir'
        male = 'Masculino'
        female = 'Femenino'
        nonBinary = 'No binario'
        white = 'Blanco'
        africanAmerican = 'Afro Americano'
        nativeAmerican = 'Americano nativo / Alaskeño Nativo'
        pacificIslander = 'Nativo Islas del Pacífico '
        asian = 'Asiático'
        nativeHawaiian = 'Hawaiiano nativo'
        latino = 'Latino o Hispano'
    }


    return (
        <div className='containerFormExtra'>
            {err && <h5 style={{ color: 'red' }}>{err}</h5>}
            <div className="row" onChange={handleInputChange}>
                <div className="column" >
                    {/* <p className="text_input_extra_data">{<Translate content="nombre" component="span" />}*</p>
                    <input className="swal2-inputmh4" name='name' onChange={handleInputChange} /> */}
                    <p className="text_input_extra_data">{<Translate content="nacimiento" component="span" />}</p>
                    <input className="swal2-inputmh4" type='date' name='age' onChange={handleInputChange} />
                    <p className="text_input_extra_data">{<Translate content="pais" component="span" />}</p>
                    <input className="swal2-inputmh4" value={country.country ? country.country : countrytext} name='city' onChange={(e) => setcountrytext(e.target.value)} />
                    <p className="text_input_extra_data">{<Translate content="genero" component="span" />}</p>
                    <select className="swal2-inputmh4" name='gender' onChange={handleInputChange}>
                        <option value='' hidden selected>{''}</option>
                        <option value='prefer-not-to-answer'>{preferNotToSay}</option>
                        <option value='male'>{male}</option>
                        <option value='female'>{female}</option>
                        <option value='non-binary'>{nonBinary}</option>
                    </select>
                </div>
                <div className="column" >
                    {/* <p className="text_input_extra_data" >{<Translate content="apellido" component="span" />}</p>
                    <input className="swal2-inputmh4" name='lastname' onChange={handleInputChange} /> */}
                    <p className="text_input_extra_data">{<Translate content="ciudad" component="span" />}</p>
                    <input className="swal2-inputmh4" value={country.city ? country.city : citytext} name='city' onChange={(e) => setscitytext(e.target.value)} />
                    <p className="text_input_extra_data">{<Translate content="etnia" component="span" />}</p>
                    <select class="swal2-inputmh4" name='ethnicity' onChange={handleInputChange}>
                        <option value='' hidden selected>{''}</option>
                        <option value='white'>{white}</option>
                        <option value='african-american'>{africanAmerican}</option>
                        <option value='native-american'>{nativeAmerican}</option>
                        <option value='pacific-islander'>{pacificIslander}</option>
                        <option value='asian'>{asian}</option>
                        <option value='native-hawaiian'>{nativeHawaiian}</option>
                        <option value='hipanic-latino'>{latino}</option>
                    </select>
                </div>
            </div>
            <button className='buttonRegisterExtraData' onClick={SendToBackEnd}>{<Translate content="botonRegistro" component="span" />} </button>
        </div>
    )
}

export default FormData;