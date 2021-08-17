import React from 'react'

function Loading() {
    return (
        <div style={{ width: '100%', justifyContent: 'center', position: 'absolute', left: '47%', top: '40%', height: '1px', width: '20px' }}>
            <img style={{ height: '80px', width: '80px' }} src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
            <p style={{ color: 'white', fontSize: '25px', marginLeft: '-5px' }}>Loading...</p>
        </div>
    )
}

export default Loading
