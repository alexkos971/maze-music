import React from 'react';

import './Main.scss';
import FullPlayer from '../Main/FullPlayer';

// Selectors
import Albums from './Albums';
import Artist from './Artist';
import Playlist from './Playlist';
import Songs from './Songs';

const Main = ({full, title, artists, songs, nowSong, setNowSong, start, setStart, timeTemplate }) => {


    document.addEventListener('keydown', e => {
        if (e.code === 'Space') {
            setStart(!start);
            // console.log(start);
        }
    });

    return (
        <div className="music__main">
            <FullPlayer full={full} nowSong={nowSong}/>

            <span className="music__main-dir">{title}</span>

            {title === "Albums" && <Albums/>}

            {title === "Artist" && 
                <Artist 
                    artists={artists} 
                    songs={songs}
                    setNowSong={setNowSong}
                    start={start} 
                    setStart={setStart}
                    timeTemplate={timeTemplate}/>}

            {title === "Playlist" && <Playlist/>}
            {title === "Songs" && <Songs/>}
        </div>
    );
}

export default Main;