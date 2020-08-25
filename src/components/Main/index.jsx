import React, { useState, useEffect } from 'react';

import './Main.scss';
import FullPlayer from '../Main/FullPlayer';

// Selectors
import Albums from './Albums';
import Artists from './Artists';
import Playlist from './Playlist';
import Songs from './Songs';

const Main = ({full, title, sidebarItem, nowSong, setNowSong, start, setStart, timeTemplate, save, onSaveSong }) => {
    

    let page = () => {
        console.log(title);

        switch (sidebarItem) {
            case 1:
                return (<Playlist/>);
            case 2:
                return (
                    <Artists
                        nowSong={nowSong}
                        setNowSong={setNowSong}
                        start={start} 
                        setStart={setStart}
                        timeTemplate={timeTemplate}/>);
            case 3:
                return (<Albums/>);
            case 4:
                return (
                    <Songs 
                        nowSong={nowSong}
                        setNowSong={setNowSong}
                        start={start} 
                        setStart={setStart}
                        timeTemplate={timeTemplate}
                        save={save}
                        onSaveSong={onSaveSong} />
                );
            default:
                return (
                    <h1 className="load_title">404! Directory not found</h1>
                );    
        }
    }

    return (
        <div className="music__main">
            <FullPlayer full={full} nowSong={nowSong}/>

            <span className="music__main-dir">{title}</span>
            
            {page()}
        </div>
    );
}

export default Main;