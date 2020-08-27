import React, { useState, useEffect } from 'react';

import './Main.scss';
import FullPlayer from '../Main/FullPlayer';

// Selectors
import Albums from './Pages/Albums';
import Artists from './Pages/Artists';
import Playlist from './Pages/Playlist';
import Songs from './Pages/Songs';
import Profile from './Profile';

import {lampImg, orangeImg, photoImg, cameraImg} from '../../components/Main/images';

const Main = ({full, title, sidebarItem, nowSong, setNowSong, start, setStart, timeTemplate, save, onSaveSong, night, setNight }) => {
    const [header, setHeader] = useState(false);

    let page = () => {


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

            <div className="music__main-header">

                <div className="music__main-header-head" onClick={() => setHeader(!header)}>      
                    <div className="music__main-header-head-wrap">
                        <img src={photoImg} alt=""/>
                    </div>

                    <span>
                        <i className="fas fa-chevron-down"></i>
                    </span>

                </div>
                
                <ul className={`music__main-header-list${header ? "-active" : ""}`}>
                    <li>
                        <span><i className="fas fa-cog"></i></span>
                        <span>Settings</span>
                    </li>
                    <li onClick={() => setNight()}>
                        <span><i className="fas fa-sun"></i></span>
                        <span>Night Mode</span>
                    </li>
                    <li>
                        <span><i className="fas fa-user-circle"></i></span>
                        <span>Profile</span>
                        </li>
                    <li>
                        <span><i className="fas fa-user-circle"></i></span>
                        <span>Contact</span>
                    </li>
                </ul>
            </div>
            
            {page()}
        </div>
    );
}

export default Main;