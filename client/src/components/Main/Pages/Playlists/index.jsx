import React, { useState, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import axios from "axios";

import './Playlist.scss';

const Playlists = () => {
    const [data, setData] = useState([])

    useEffect(() => {
     axios.get("http://localhost:3001/playlists/")
        .then(({ data }) => setData(data));   
    }, [])


    return (
        <div className="music__main-playlist">
            <h2 className="subtitle">My playlists</h2>

            <ul className="music__main-playlist-list">           
                {
                    (data) ? (
                        data.map((item) => {
                            return (
                                <li>
                                    <NavLink to={"/Playlists/" + item.name}>
                                        <div className="music__main-playlist-list_img-wrap">
                                            <img src={item.cover} alt=""/>
                                            
                                            <i className={`fas fa-play-circle play_btn`}></i>
                                        </div>
                                        
                                        <span>
                                            {item.id}. 
                                        </span>
                                          
                                        <h2>
                                            {item.name}
                                        </h2>
                                        
                                        <span>
                                        </span>
                                    </NavLink>
                                </li>
                            )
                        })
                    ) : (<h2 className="subtitle">Error</h2>)
                }
            </ul> 
        </div>
    )
}

export default Playlists;