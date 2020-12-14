import React, { useContext } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

import './Main.scss';

// import { useAuth } from '../../hooks/auth.hook';
// import { useHttp } from '../../hooks/http.hook';
import { Context } from '../../context';

import FullPlayer from '../Main/FullPlayer';

// Selectors
import Albums from './Pages/Albums';
import For from './Pages/For';
import Artist from './Pages/Artist';
import Playlists from './Pages/Playlists';
import Songs from './Pages/Songs';
import Profile from './Profile';
// import Artist from './Pages/Artist';

const Main = ({ full, setDir, dir, me, nowSong, startSong, setPrevSong, setNextSong, playSong, timeTemplate, save, onSaveSong, onSavePlaylist, night, setNight, setHeader, header, isAuthenticated }) => {
    
    let {profile, logout} = useContext(Context);

    return (
        <div className="music__main">
            <FullPlayer full={full} nowSong={nowSong}/>


            <div className="music__main-header">
            
                <span className="music__main-header-dir">{dir}</span>

                <div className="music__main-header-head" onClick={() => setHeader(!header)}>
                    <h3>{profile ? profile.name : 'User'}</h3>

                    <span>
                        <i className={`fas fa-chevron-${!header ? "down" : "up"}`}></i>
                    </span>

                </div>
                
                <ul className={`music__main-header-list${header ? "-active" : ""}`}>
                    <li>
                        <span><i className="fas fa-cog"></i></span>
                        <span>Settings</span>
                    </li>
                    <li onClick={() => setNight()}>
                        <span><i className={`fas fa-${!night ? "sun" : "moon"}`}></i></span>
                        <span>{night ? 'Night' : 'Light'} Mode</span>
                    </li>
                    <li>
                        {/* <NavLink to={"/profile"}> */}
                            <span><i className="fas fa-user-circle"></i></span>
                            <span>Profile</span>
                        {/* </NavLink> */}
                    </li>
                    <li onClick={() => logout()}>
                        <Link to="/auth">
                            <span><i className="fas fa-user-circle"></i></span>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>

            
            {/* {!isAuthenticated && <Redirect to="/auth" />} */}
            
            <Route path="/" exact>
                { isAuthenticated ? 
                <Redirect to="/For you"/>
                : 
                <Redirect to="/auth" />
            }
            </Route>


            <Route path={"/Playlists"} exact>
                <Playlists/>
            </Route>

            <Route path={"/For you"} exact>
                <For
                    nowSong={nowSong}
                    setPrevSong={setPrevSong}
                    setNextSong={setNextSong}
                    save={save}
                    onSavePlaylist={onSavePlaylist}
                    onSaveSong={onSaveSong}
                    playSong={playSong}
                    setDir={setDir}
                    me={me}
                    startSong={startSong} 
                    timeTemplate={timeTemplate}/>
            </Route>

            <Route path={"/Artist:id"} exact>
                <Artist setDir={setDir}/>
            </Route> 

            <Route path={"/Albums"} exact>
                <Albums/>
            </Route>

            <Route path={"/Songs"} exact>
                <Songs 
                    nowSong={nowSong}
                    startSong={startSong} 
                    playSong={playSong}
                    timeTemplate={timeTemplate}
                    saved={save}
                    me={me}
                    onSaveSong={onSaveSong} />
            </Route>

            <Route path={"/profile"} exact>
                <Profile/>
            </Route>
        </div>
    );
}

export default Main;