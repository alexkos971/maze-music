import React from 'react';
import '../Main.scss';

const FullPlayer = ({ full, nowSong }) => {
    return (
        <div className={full ? "music__main-full-active" : "music__main-full"}>

            <div className="music__main-full-info">
                <h1>{nowSong.name}</h1>

                <span>Atrist: <span>{nowSong.artist}</span></span>
                <span>Albums: <span>{nowSong.albums}</span></span>
            </div>

            <div className="music__main-full-cover">
                <div className="music__main-full-cover-container">
                    <img src={nowSong.cover} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default FullPlayer;