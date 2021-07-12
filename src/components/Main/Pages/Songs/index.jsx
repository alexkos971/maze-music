import React from 'react';
import { Link } from 'react-router-dom';

import { onPlay, saveSong } from '../../../../redux/actions'
import { connect } from 'react-redux';

import { useHttp } from '../../../../hooks/http.hook';
import { downloadIcon } from '../../images';
import './Songs.scss';

const Songs = ({  dispatch, savedSongs, song, start }) => {
    
    const { loading } = useHttp();
 

    return (
        <div className="music__main-songsList">
            <h2 className="subtitle">My songs</h2>

        {loading ? <h1 className="load_title">Loading...</h1> :
                
            <ol className="music__main-songs-list songs-list">
                {savedSongs &&
                    savedSongs.map(item => {

                        return (
                            <li key={item._id} id={(song && song._id === item._id) ? "now_play" : ''}>
                                    <i className={`fas fa-${(start && song._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                                        onClick={() => {
                                            dispatch(onPlay(item, start));
                                        }}>
                                    </i>

                                    <span className="music__main-songs-list_name">
                                        <Link to={`Artist:${item.artist_id}`} className="music__main-songs-list-link">
                                            {item.artist_name}
                                            <span> - </span>
                                        </Link>
                                        {item.name}
                                    </span>

                                    <div className="music__main-songs-list_right">
                                        <a href={item.src} download>
                                            <span className="music__main-songs-list_right-download">
                                                <img src={downloadIcon} alt=""/>
                                            </span>
                                        </a>

                                        <span className="music__main-songs-list_right-save"
                                            onClick={() => dispatch(saveSong(item))}>
                                            <i className={`fas fa-heart`}></i>
                                        </span>
                                        
                                        <span className="music__main-songs-list_right-time_now">
                                            { item.dur}
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

const mapStateToProps = (state) => {
    return {
        savedSongs: state.profile.profile.saved_songs,
        song: state.onPlay.song,
        start: state.onPlay.start
    }
}

export default connect(mapStateToProps)(Songs);