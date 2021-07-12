import React from "react";
import { Link } from "react-router-dom";

import "./SongsTemp.scss";
import {  connect } from "react-redux";
import { onPlay, getMySongs } from "../../../redux/actions";


import { useHttp } from "../../../hooks/http.hook";
import { useAuth } from "../../../hooks/auth.hook";
import { useMessage } from "../../../hooks/message.hook";
import { downloadIcon } from '../images';

const SongsTemp = ({ dispatch, songs, song, start, my, night }) => {

    const { loading, request, error } = useHttp();
    const { token } = useAuth();
    const message = useMessage();

    const deleteSong = async (id) => {  
        let qustion = window.confirm("Вы точно хотите удалить этот трек ?");
        
        if (qustion) {

            let data = await request(`/api/songs/delete/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            
            
            if (error) {
                alert(error)
            }
            
            if (data) {
                const newSongs = songs.filter(item => {
                    return item._id !== id;
                })
                message(data.message)
                await dispatch(getMySongs(newSongs))
                // console.log(data)
            }
        }
        else {
            return;
        }
    }

    return (
        <ol className={`music__main-temp-songs-list${!night ? " night" : ""}`}>
            
            <span className="music__main-temp-songs-view">View all</span>
        
            {!loading &&
                songs.map((item, index) => {
                
                return (
                    <li key={index} id={(song && song._id === item._id) ? "now_play" : ''}>
                        <i className={`fas fa-${(start && song && song._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                            onClick={() => { 
                                dispatch(onPlay(item, songs));
                            }}>
                        </i>

                        <div className="music__main-temp-songs-list-avatar">
                            <img src={item.cover} alt="avatar" />
                        </div>

                        <span className="music__main-temp-songs-list_name">
                            <Link to={`Artist:${item.artist_id}`} className="music__main-temp-songs-list-link">
                                <span className="music__main-temp-songs-list_artist-name">
                                    {item.artist_name}
                                </span>
                                <span> - </span>
                            </Link>
                            {item.name}
                        </span>

                        <span className="music__main-temp-songs-list-album">{songs.album ? songs.album : "single"}</span>

                        <div className="music__main-temp-songs-list_right">

                            {my &&
                                <span className="music__main-temp-songs-list_right-trash" onClick={() => deleteSong(item._id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            }

                            <a href={item.src} download>
                                <span className="music__main-temp-songs-list_right-download">
                                    <img src={downloadIcon} alt=""/>
                                </span>
                            </a>

                            <span className="music__main-temp-songs-list_right-save"
                                onClick={() => alert("saved")}>
                                <i className={`fa${item.saved ? 's' : 'r'} fa-heart`}></i>
                            </span>
                            
                            <span className="music__main-temp-songs-list_right-time_now">
                                { item.duration}
                            </span>
                        </div>

                    </li>
                );
                })
            }
    </ol>
    )
}

const mapStateToProps = (state) => {
    return {
        song: state.onPlay.song,
        start: state.onPlay.start,
        night: state.interface.night
    }
}

export default connect(mapStateToProps)(SongsTemp)