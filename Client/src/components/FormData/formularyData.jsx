import React, {useState} from 'react';
import axios from 'axios';




const FormData = () => {
    const [names, setNames] = useState('');
    const [surnames, setSurnames] = useState('');
    const [age, setAge] = useState('');
    const fecha = new Date();
    ////////////
    const [pais, setPais] = useState([])
    const [browser, setBrowser] = useState([])
    const [prueba, setPrueba] = useState('aaaa-mm-dd')
    const [inputCountry, setInputCountry] = useState('')
    
    var arrCountries = [];


    if(age.length === 2 || age.length === 4) {
        setNames(age + '-')
    }
    
    const orderCountries = (e, array) => {
        arrCountries = []
        array.map(country => {
            if(country.includes(e.target.value.toLowerCase())){
                arrCountries.push(country)
        }})
        setInputCountry(e.target.value)
        setBrowser(arrCountries)
    }


    const AskCountries = async () =>{
        let Countries = await axios.get(`${process.env.REACT_APP_API_URL}country`)
        let response = await Countries
        setPais(response.data.map(country => country.toLowerCase()));
    }
    
    let dayCurrent = fecha.getDate();
    dayCurrent = dayCurrent.toString()
    let monthCurrent = fecha.getMonth() + 1;
    monthCurrent = monthCurrent.toString()
    let YearCurrent = fecha.getFullYear();
    
    
    if(dayCurrent.length === 1){
        dayCurrent = '0' + dayCurrent
    }
    if(monthCurrent.length === 1){
        monthCurrent = '0' + monthCurrent
    }
    
    let dateCurrent = YearCurrent + '-' + monthCurrent + '-' + dayCurrent;
    let minYear = YearCurrent - 100;
    let minDate = minYear + '-' + monthCurrent + '-' + dayCurrent;
    
    if(!pais.length){
        AskCountries()
    }
    
    const postRegister = () => {
        if(!names){
            alert('')
            return
        }
        if(!surnames){
            alert('2')
            return
        }
        if(!prueba || prueba === 'aaaa-mm-dd'){
            alert('3')
            return
        }
        if(inputCountry !== browser[0]){
            alert('4')
            return
        }
        let obj = {
        }
        // axios.post(`${process.env.REACT_APP_API_URL}URL A PONER`, obj);
        window.location.href = ('login')
    }



    return (
        <div>
            <form>
                <label htmlFor='Names'>Names</label>
                <input type='text' name='Names' onChange={(e) => setNames(e.target.value)}/>
                <label htmlFor='Surnames' >Lastnames</label>
                <input type='text' name='Surnames'onChange={(e) => setSurnames(e.target.value)}/>
                <label htmlFor='Age'  onChange={(e) => setAge(e.target.value)}>Age</label>
                <input type='date' name='Age' value={prueba} max={dateCurrent} onChange={(e) => setPrueba(e.target.value)} min={minDate} />
                <input type="text" value={inputCountry} placeholder="Search.." id="myInput" onChange={(e) => orderCountries(e, pais)}/>
                    <ul>
                    {
                        browser.map(x => {return(<li onClick={() => {setInputCountry(x)
                            orderCountries({target: {value: x}}, pais)}}>{x}</li>)})
                    }
                    </ul>
            </form>
            <button onClick={postRegister}> Send </button>
        </div>
    )
}


export default FormData;