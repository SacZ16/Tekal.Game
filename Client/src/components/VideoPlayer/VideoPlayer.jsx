import ReactPlayer from 'react-player';

function VideoPlayer({ currentVideo }) {

    return (
        <>
            {
                (currentVideo !== '') &&
                <div>
                    {currentVideo}
                    {/* <ReactPlayer
                        width="50%"
                        height="50%"
                        url={currentVideo.name}
                        playing
                        muted
                    /> */}
                </div>
            }
        </>
    )
}

export default VideoPlayer