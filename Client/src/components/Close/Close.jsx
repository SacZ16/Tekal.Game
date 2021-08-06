import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function Close() {

    const { user } = useSelector(state => state);
    const { numAciertos, lives } = user.currentGame

    return (
        <div>
            <Link to='login'>Volver</Link>
            <br />
            <h1>Numero de Aciertos: {numAciertos}</h1>
            {lives === 0 ? '' : <h1>Vidas: {lives}</h1>}

        </div>
    )
}

export default Close
