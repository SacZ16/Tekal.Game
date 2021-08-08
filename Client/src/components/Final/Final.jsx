import React from 'react'
import { Link } from 'react-router-dom'
import './final.css'
import Particles from 'react-particles-js'
import { getParticleBaseVelocity } from 'tsparticles/Utils'

function Finalgame() {
    const data ={
        labels:['1','2','3','4','5'],
        datasets:[{
            label:'sesiones',
            background:'rgba(0,255,0,1)',
            borderColor:'black',
            borderWidth:1,
            hoverBackgroundColor:'rgba(0,255,0,2)',
            hoverBorderColor:'#FF0000',
            // data
        }]
    }
    return (
        <div>
            <div className='bgLandingfinal'>
        <Particles
                params={{'particles':{"number":{"value":96,"density":{"enable":true,"value_area":800}}},'line_linked':{'width':'2'},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"}}}}}
            />
            </div>
                <h1 className='yourscore'>you score is</h1>
            <div className='marco'>
                <h1 className="porcentaje">74%</h1>
            <div className='loader'>
            </div>
            <div><input type="text" className="parametro" placeholder="parametro"/><input type="number" className="valor" placeholder="valor"/></div>
            </div>
            <p className='copyright'>© 2021 Tekal, Inc. All rights reserved</p>
        </div>
    )
}

export default Finalgame
