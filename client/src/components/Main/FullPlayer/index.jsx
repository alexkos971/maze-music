import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { setFullPlayer } from '../../../redux/actions';

import '../Main.scss';


const FullPlayer = ({ dispatch, full, song }) => {
    
    return (
        <div className={full ? "music__main-full-active" : "music__main-full"}>

        {song && 
        <div>
            <div className="music__main-full-info">
                <h1>{song.name}</h1>

                <span>Artist:  
                    <Link to={`/Artist:${song.artist_id}`} onClick={() => dispatch(setFullPlayer(false))}>
                        <span> {song.artist_name}</span>
                    </Link>
                </span>

                {song.album_name &&  <span>Album: <span>{song.album_name}</span></span>}
            </div>

            <div className="music__main-full-cover">
                <div className="music__main-full-cover-container">
                    <img src={song.cover} alt=""/>
                </div>
            </div>

            <div className="music__main-full-lyrics">
                <h3>Lyrics:</h3>
            
                <span>{song.lyrics}</span>
                 
            </div>
        </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        song: state.onPlay.song,
        full: state.interface.fullPlayer
    }
}

export default connect(mapStateToProps)(FullPlayer);