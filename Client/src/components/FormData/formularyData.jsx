import React, {useState} from 'react';
import axios from 'axios';

const FormData = () => {
    const [names, setNames] = useState('');
    const [surnames, setSurnames] = useState('');
    const [age, setAge] = useState('');
    const fecha = new Date();
    
    const [prueba, setPrueba] = useState('aaaa-mm-dd')


    if(age.length === 2 || age.length === 4) {
        setNames(age + '-')
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
    
    
    console.log(dateCurrent)


    const postForm = () => {
        const formulary = {
            name: names,
            surname: surnames,
            age: age,
        }
    }

    return (
        <div>
            <form>
                <label htmlFor='Names'>Names</label>
                <input type='text' name='Names' onChange={(e) => setNames(e.target.value)}/>
                <label htmlFor='Surnames' onChange={(e) => setSurnames(e.target.value)}>Surnames</label>
                <input type='text' name='Surnames'/>
                <label htmlFor='Age'  onChange={(e) => setAge(e.target.value)}>Age</label>
                <input type='date' name='Age' value={prueba} max={dateCurrent} onChange={(e) => setPrueba(e.target.value)} min={minDate} />
            </form>
            <button></button>
        </div>
    )
}


export default FormData;