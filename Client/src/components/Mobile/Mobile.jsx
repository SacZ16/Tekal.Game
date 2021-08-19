import React, { useEffect, useRef } from 'react'

function Mobile() {

    const video = useRef()

    useEffect(() => {
        // window.addEventListener("touchstart", (e) => console.log(e));
        video.current.addEventListener("touchstart", (e) => console.log(e))

    }, []);

    return (
        <div >
            <h1 onTouchStart={() => console.log('toque')}>Toca</h1>
            <div ref={video}>
                <h1>Aca solamente</h1>
                <h1>Aca solamente</h1>
                <h1>Aca solamente</h1>
                <h1>Aca solamente</h1>
                <h1>Aca solamente</h1>
                <h1>Aca solamente</h1>
                <h1>Aca solamente</h1>
            </div>
            <div>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
                <h1>Aca no</h1>
            </div>
        </div>
    )
}

export default Mobile
