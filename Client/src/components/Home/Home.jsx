import React from 'react'
import { Link } from 'react-router-dom'



function Home() {
    return (
        <div>
            <Link to='/login'>Volver</Link>
            <br />
            <Link to='/game'>Iniciar Juego</Link>
        </div>
    )
}

export default Home
