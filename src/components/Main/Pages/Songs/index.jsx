import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Songs.scss';

const Songs = ({ nowSong, setNowSong, start, setStart, timeTemplate, save, onSaveSong }) => {

    const [songList, setSongList] = useState([]);

    
    useEffect(() => {
        axios.get("http://localhost:3001/songs/")
            .then(({ data }) => {
              setSongList(data); 
            })
    }, [save]);
    

    const playSong = (play, item) => {
        if (item.id === nowSong.id) {
            setStart(play);
        }
        else {
            setStart(!play);
        }
        
        let now = {
            "id": item.id,
            "name": item.name,
            "artist": item.artist,
            "albums": item.albums,
            "src": item.src,
            "cover": item.cover,
            "saved": item.saved
        }
        setNowSong(now);
    }

    return (
        <div className="music__main-songsList">

            <div className="music__main-songs-nav">
            
                <h2 className="subtitle">My songs</h2>
                    
                    <div className="music__main-songs-nav-bar">
                        <span>
                            <i className="far fa-heart"></i>
                        </span>

                        <span>
                            <i className="far fa-plus-square"></i>
                        </span>

                        <span>
                            <i className="far fa-share-square"></i>
                        </span>
                    </div>
            </div>

            <ol className="music__main-songs-list songs-list">
                {
                    songList.map(item => {
                        if (item.saved) {

                            let audio = new Audio();
                            audio.src = item.src;

                            let time = timeTemplate(audio.src);
                            return (
                                <li key={item.id} id={(nowSong.id === item.id) ? "now_play" : ''}>
                                    <i className={`fas fa-${(start && nowSong.id === item.id) ? "pause" : "play"}-circle play_btn`} 
                                        onClick={() => playSong(!start, item)}>
                                    </i>
                                    <span className="music__main-songs-list_name">{`${item.artist} - ${item.name}`}</span>

                                    <span className="music__main-songs-list-saved"
                                        onClick={() => onSaveSong(save, item.id)}>

                                        <i className={`fa${item.saved ? "s" : "r"} fa-heart`}></i>
                                    </span>

                                    <span className="music__main-songs-list-time_now">
                                        03:45
                                    </span>    
                                </li>
                            )
                        }
                    })
                }
            </ol>
        </div>
    )
}

export default Songs;