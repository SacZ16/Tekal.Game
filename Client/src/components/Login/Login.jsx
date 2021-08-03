import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>
            <button >Login</button>
            <Link to='/formRegister'>
                <button >Register</button>
            </Link>
        </div>
    )
}

export default Login
