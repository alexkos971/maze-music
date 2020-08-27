import React, { useState, useEffect } from 'react';
import { Route, useHistory, NavLink } from 'react-router-dom';

import './Main.scss';
import FullPlayer from '../Main/FullPlayer';

// Selectors
import Albums from './Pages/Albums';
import Artists from './Pages/Artists';
// import Artist from './Pages/Artist';
import Playlist from './Pages/Playlist';
import Songs from './Pages/Songs';
import Profile from './Profile';

import {lampImg, orangeImg, photoImg, cameraImg} from '../../components/Main/images';
import Artist from './Pages/Artist';

const Main = ({full, title, nowSong, setNowSong, start, setStart, timeTemplate, save, onSaveSong, night, setNight }) => {
    
    const [header, setHeader] = useState(false);
    let history = useHistory();

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
                    <li onClick={() => setNight(!night)}>
                        <span><i className="fas fa-sun"></i></span>
                        <span>Night Mode</span>
                    </li>
                    <li>
                        <NavLink to={"/profile"}>
                            <span><i className="fas fa-user-circle"></i></span>
                            <span>Profile</span>
                        </NavLink>
                        </li>
                    <li>
                        <span><i className="fas fa-user-circle"></i></span>
                        <span>Contact</span>
                    </li>
                </ul>
            </div>

            <Route path={"/Playlist"}>
                <Playlist/>
            </Route>

            <Route path={"/Artists"}>
                <Artists
                    nowSong={nowSong}
                    setNowSong={setNowSong}
                    start={start} 
                    setStart={setStart}
                    timeTemplate={timeTemplate}/>
            </Route>

            <Route path={"/Albums"}>
                <Albums/>
            </Route>

            <Route path={"/Songs"}>
                <Songs 
                    nowSong={nowSong}
                    setNowSong={setNowSong}
                    start={start} 
                    setStart={setStart}
                    timeTemplate={timeTemplate}
                    save={save}
                    onSaveSong={onSaveSong} />
            </Route>

            <Route path={"/profile"}>
                <Profile/>
            </Route>
        </div>
    );
}

export default Main;