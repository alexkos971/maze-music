import React, { useContext, useCallback, useEffect } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Main.scss';
import { Context } from '../../context';
import { useHttp } from '../../hooks/http.hook';

// Redux
import { setNight, setHeader, getProfile, changeDir } from '../../redux/actions'

// Selectors
import FullPlayer from '../Main/FullPlayer';
import Albums from './Pages/Albums';
import For from './Pages/For';
import Artist from './Pages/Artist';
import Playlists from './Pages/Playlists';
import Songs from './Pages/Songs';
import Upload from './Pages/Upload';
import Profile from './Profile';
import Settings from './Settings';
// import Artist from './Pages/Artist';

const Main = ({ dispatch, directory, save, onSaveSong, onSavePlaylist, night, header, isAuthenticated, profile }) => {
    
    let { logout, token } = useContext(Context);
    const { request } = useHttp();
    

    const getProfileData = useCallback(async () => {
        try {
            let me = await request('/api/data/profile', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            
            if (me) {
                dispatch(getProfile(me));
            }
        }
        catch (e) { console.log(e) }
      }, [profile])
    
      useEffect(() => {
        getProfileData();
      }, [])

    return (
        <div className="music__main">
            <FullPlayer />


            <div className="music__main-header">
            
                <span className="music__main-header-dir">{directory}</span>


                <div className="music__main-header-head">
                    <ul className={`music__main-header-head-navbar`}>
                        <li>
                            <Link to={"/settings"} onClick={() => {
                                dispatch(changeDir('Settings'))
                            }}>
                                <span><i className="fas fa-sliders-h"></i></span>
                            </Link>
                        </li>
                        <li onClick={() => dispatch(setNight())}>
                            <span><i className={`fas fa-${!night ? "sun" : "moon"}`}></i></span>
                        </li>

                        <li>
                            <span><i className={`fas fa-bell`}></i></span>
                        </li>
                    </ul>

                    <Link to={"/profile"} onClick={() => {
                                dispatch(changeDir('Profile'))
                            }}>
                        <div className="music__main-header-head-avatar">
                            <img src={profile.avatar} />
                        </div>
                    </Link>

                    <h3>{profile.name}</h3>

                    <span onClick={() => dispatch(setHeader(!header))}>
                        <i className={`fas fa-chevron-${!header ? "down" : "up"}`}></i>
                    </span>
                </div>
                
                <div className={`music__main-header-menu${header ? '-active' : ""}`}>
                    <Link to="/auth" onClick={() => logout()}>
                        <span><i className="fas fa-user-circle"></i></span>
                        <span>Logout</span>
                    </Link>
                </div>

            </div>

            
            {/* {!isAuthenticated && <Redirect to="/auth" />} */}
            
            <Route path="/" exact>
                { isAuthenticated ? 
                <Redirect to={`/${directory}`} />
                : 
                <Redirect to="/auth" />
            }
            </Route>


            <Route path={"/Playlists"} exact>
                <Playlists/>
            </Route>

            <Route path={"/For you"} exact>
                <For
                    save={save}
                    onSavePlaylist={onSavePlaylist}
                    onSaveSong={onSaveSong} />
            </Route>

            <Route path={"/Artist:id"} exact>
                <Artist/>
            </Route> 

            <Route path={"/Albums"} exact>
                <Albums/>
            </Route>

            <Route path={"/Songs"} exact>
                <Songs 
                    onSaveSong={onSaveSong} />
            </Route>

            <Route path={"/Upload"}>
                <Upload />
            </Route>

            <Route path={"/profile"} exact>
                <Profile/>
            </Route>

            <Route path="/settings">
                <Settings />
            </Route>
        </div>
    );
}

const mapStateToProps = (state) => {
    
    return {
        directory: state.changeDir.dir,
        start: state.onPlay.start,
        song: state.songs.song,
        night: state.interface.night,
        header: state.interface.header,
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(Main);