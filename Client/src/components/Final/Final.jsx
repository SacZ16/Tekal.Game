import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/final.css'
import Particles from 'react-particles-js'
import { Line } from 'react-chartjs-2'

function Finalgame() {
    const data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'sesiones',
            fill: false,
            borderColor: '#1663A2',
            borderWidth: 6,
            data: ['60', '43', '1', '80', '74']
        }]
    }
    const opciones = {
        maintainAspectRatio: false,
        responsive: true,
    }
    const config = {
        type: 'line',
        data: data,
    };
    return (
        <div>
            <div className='bgLandingfinal'>
                <Particles
                    params={{ 'particles': { "number": { "value": 96, "density": { "enable": true, "value_area": 800 } } }, 'line_linked': { 'width': '2' }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" } } } }}
                />
            </div>
            <h1 className='yourscore'>Your score is</h1>
            <div className='marco'>
                <h1 className="porcentaje">74%</h1>
                <div className='loader'>
                </div>
            </div>
            <div className="grafico">

                <Line data={data} options={opciones} config={config} />
            </div>
            <div className='buttonRegister2' >
                <div>
                    <button className='buttonRegister' >Home</button>
                </div>
                <div>
                    <button className='buttonRegister'  >Try again</button>
                </div>
            </div>
            <p className='copyright'>Â© 2021 Tekal, Inc. All rights reserved</p>
        </div>
    )
}

export default Finalgame