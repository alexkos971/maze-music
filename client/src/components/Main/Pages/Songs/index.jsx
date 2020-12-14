import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useHttp } from '../../../../hooks/http.hook';
import { Context } from '../../../../context';
import { downloadIcon } from '../../images';
import './Songs.scss';

const Songs = ({ nowSong, startSong, playSong, timeTemplate, saved, onSaveSong, me }) => {

    const [songList, setSongList] = useState([]);
    const [dur, setDur] = useState({});

    const { token } = useContext(Context);
    const { loading, request } = useHttp();


    const getSongs = useCallback(async () => {
        try {
            const data = await request('/api/songs/my', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setSongList(data);
        }
        catch (e) {
            console.log(e);
        }
    }, [request, token]);

    useEffect(() => {
        getSongs();
    }, [getSongs]);
 

    return (
        <div className="music__main-songsList">
            <h2 className="subtitle">My songs</h2>

        {loading ? <h1 className="load_title">Loading...</h1> :
                
            <ol className="music__main-songs-list songs-list">
                {
                    songList.map(item => {

                        if(!(item._id in dur)){
                            let audio = new Audio();
                            audio.src = item.src;
                                
                            audio.oncanplay = (e) => {
                                let obj = dur;
                                obj[item._id] = e.target.duration
                                setDur(obj);
                            }
                        }

                        return (
                            <li key={item._id} id={(nowSong._id === item._id) ? "now_play" : ''}>
                                    <i className={`fas fa-${(startSong && nowSong._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                                        onClick={() => playSong(!startSong, item)}>
                                    </i>

                                    <span className="music__main-songs-list_name">
                                        <Link to={`Artist:${item.artist[1]}`} className="music__main-songs-list-link">
                                            {item.artist[0]}
                                            <span> - </span>
                                        </Link>
                                        {item.name}
                                    </span>

                                    <div className="music__main-songs-list_right">
                                        <span className="music__main-songs-list_right-download">
                                            <img src={downloadIcon} alt=""/>
                                        </span>

                                        <span className="music__main-songs-list_right-save"
                                            onClick={() => onSaveSong(saved, item._id)}>
                                            <i className={`fa${saved ? "s" : "r"} fa-heart`}></i>
                                        </span>
                                        
                                        <span className="music__main-songs-list_right-time_now">
                                            {timeTemplate(dur[item._id])}
                                        </span>
                                    </div>

                                </li>
                        )
                    })
                }
            </ol>}
        </div>
    )
}

export default Songs;