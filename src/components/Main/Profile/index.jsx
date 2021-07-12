import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMySongs, setProfile } from '../../../redux/actions';

import { useHttp } from '../../../hooks/http.hook';
import { useAuth } from "../../../hooks/auth.hook";
import { useMessage } from "../../../hooks/message.hook";

import "./Profile.scss"

import SongsTemp from "../SongsTemp"


const Profile = ({ dispatch, profile, mySongs, savedSongs, song, start, night }) => {
    const { loading, request } = useHttp();
    const { token } = useAuth();

    const [checked, setChecked] = useState(false)

    const frequent = {
        artists: [
            { 
                "name": "Валентин Стрыкало",
                "link": "#"
            },
            { 
                "name": "Alex Kos",
                "link": "601d8286665abe1cf86c40f6"
            },
            { 
                "name": "Grandson",
                "link": "#"
            }
        ],
        genres: [
            {
                "name": "EDM",
                "link": "#"
            },
            { 
                "name": "Lo-Fi",
                "link": "#"
            },
            { 
                "name": "Post Punk",
                "link": "#"
            }
        ]
    }

    const message = useMessage();

    const changeAvatar = async () => {
        let link = prompt('Paste the link of new avatar');
        
        if (!link) {
            return alert('Поле пустое !!!');
        }

        try {
            const avatar = await request('/api/changes/avatar', 'POST', { avatar: link }, {
                Authorization: `Bearer ${token}`
            })

            if (avatar) {
                message(avatar.message);
                dispatch(setProfile({...profile, avatar: avatar.avatar }))
            }
        }
        catch (e) {
            message(e.message)
        }
    }

    const changeName = async () => {
        let name = prompt('Paste the new name', profile.name);
        
        if (!name) {
            return alert('Поле пустое !!!');
        }

        try {
            const newName = await request('/api/changes/name', 'POST', { name: name }, {
                Authorization: `Bearer ${token}`
            })

            if (newName) {
                message(newName.message);
                dispatch(setProfile({...profile, name: newName.name}))
            }
        }
        catch (e) {
            message(e.message)
        }
    }

     // Get list of songs
     const getSongs = useCallback(async (list) => {
        try {
            if (!list.length) {

                let data = await request(`/api/songs/mySongs`, 'GET', null, {
                    Authorization: `Bearer ${ token }`
                });
                    if (data) {
                        dispatch(getMySongs(data))
                    }
                    else {
                        getSongs(mySongs)
                        return <h1>Loading...</h1>
                    }
                }
                else {
                    dispatch(getMySongs(list))
            }
        }
        catch (e) { console.error(e) }
    } ,[request, dispatch, token, mySongs]);
    
    useEffect(() => {
        if (token) {
            getSongs(mySongs);
        }
    }, [dispatch, token, getSongs, mySongs])


    if (loading && profile) {
        return (
            <h1 className="load_title">Loading...</h1>
        );
    }

    return (
        <div className={`music__main-profile ${!night ? "night" : ""}`}>
            <div className="music__main-profile-header">
                
                <div className="music__main-profile-header-wrap">
                    
                    <div className="music__main-profile-header-wrap-avatar">

                        <div className="music__main-profile-header-wrap-avatar-img">
                            <img src={profile.avatar} alt=""/>
                            
                            <div className="music__main-profile-header-wrap-avatar-img-change">
                                <span onClick={changeAvatar}>Change</span>
                            </div>
                        
                        </div>
                    </div>          

                    <div className="music__main-profile-header-wrap-nick">
                        <div className="music__main-profile-header-wrap-nick-name">
                            <h1>{profile.name}</h1>

                            <span>
                                <i className="fas fa-pencil-alt" onClick={changeName}></i>
                            </span>
                        </div>
                        <span>listener</span>
                    </div>
                </div>
            
            {frequent &&
                <div className="music__main-profile-header-frequents">
                    <div className="music__main-profile-header-frequents-frequent">
                        <span>Frequent artists:</span>

                        {
                            frequent.artists.map((item, index) => {
                                return (
                                    <Link className="music__main-profile-header-frequents-frequent-item" to={`Artist:${item.link}`} key={index}>
                                        {item.name}
                                    </Link>
                                )
                            })
                        }                            
                    </div>

                    <div className="music__main-profile-header-frequents-frequent">
                        <span>Frequent genres:</span>

                        {
                            frequent.genres.map((item, index) => {
                                return (
                                    <Link className="music__main-profile-header-frequents-frequent-item" to={`Genre:${item.link}`} key={index}>
                                        {item.name}
                                    </Link>
                                )
                            })
                        } 
                    </div>
                </div>
            }
            </div>

            <div className="music__main-profile-settings">
                <h2 className="subtitle">Settings</h2>

                <ul className="music__main-profile-settings-list">
                    <li className="music__main-profile-settings-list-item">
                        <span>Language:</span>

                        <div className="music__main-profile-settings-list-item-select">
                            
                            <select name="language" id="language">
                                <option value="en">English</option>
                                <option value="ru">Русский</option>
                            </select>
                        </div>
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Quality of audio:</span>

                        <div className="music__main-profile-settings-list-item-select">
                            
                            <select name="quality" id="language">
                                <option value="en">Hight</option>
                                <option value="ru">Middle</option>
                            </select>
                        </div>
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Files on device:</span>

                        <div className="music__main-profile-settings-list-item-checkbox">
                            <input type="checkbox" id="files" />
                            <label htmlFor="files" onClick={() => setChecked(!checked)}>
                                <div className={`music__main-profile-settings-list-item-checkbox-check ${checked ? "checked" : ""}`}></div>
                            </label>

                        </div>
                    </li>
                    <li className="music__main-profile-settings-list-item">
                        <span>Notifications:</span>

                        <div className="music__main-profile-settings-list-item-checkbox">
                            <input type="checkbox" id="files" />
                            <label htmlFor="files" onClick={() => setChecked(!checked)}>
                                <div className={`music__main-profile-settings-list-item-checkbox-check ${checked ? "checked" : ""}`}></div>
                            </label>

                        </div>
                    </li>
                </ul>
            </div>

            <div className="music__main-profile-songs">
                <h2 className="subtitle">Songs</h2>
                <SongsTemp songs={mySongs} my={true} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        mySongs: state.songs.mySongs,
        savedSongs: state.profile.profile.saved_songs,
        start: state.onPlay.start,
        song: state.onPlay.song,
        night: state.interface.night
    }
}

export default connect(mapStateToProps)(Profile);