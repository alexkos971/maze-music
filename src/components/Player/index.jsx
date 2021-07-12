import React, { useState,  useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { setDuration, itemDuration, setFullPlayer, setStart } from '../../redux/actions';

import './Player.scss';


const Player = ({ dispatch, start, full, song, songFrom, currentDuration, fullScreen, setFullScreen }) => { 

    const [stateVolume, setStateVolume] = useState(5);
    const [inputDuration, setInputDuration] = useState(0)

    // Play Audio
    const audio = useRef('audio_tag');


    useEffect(() => {
        audio.current.volume = stateVolume / 100;
    }, [stateVolume]);


    let onStartPlay = useCallback(async () => {
        if (start) {
            await dispatch(itemDuration(audio.current.duration))
            audio.current.play();
        }
        else {
            audio.current.pause();
        }

    }, [dispatch, start])

    useEffect(() => {
        onStartPlay();
    }, [start, onStartPlay, dispatch])


    const updateAudio = (e) => {
        dispatch(setDuration(e.target.currentTime));
        setInputDuration((audio.current.currentTime * 100) / audio.current.duration)
    }
    
    
    const handleProgress = e => { 
        let compute = (e.target.value * audio.current.duration) / 100;
        dispatch(setDuration(compute))
        audio.current.currentTime = compute;
    }

    const mouseWheel = elem => {
        // console.log(elem.deltaY);
        if (elem.deltaY > 9.8 * 100 || elem.deltaY < 0.2 * 100) {
            return false;
        }
            setStateVolume(elem.deltaY/stateVolume* 100)
    }

    const onEnd = () => {
        // dispatch(switchSong("next", songFrom))
        onStartPlay()
    }

    return (
        <div className="music__player">

            <audio 
                src={song && song.src} 
                ref={audio} 
                type="audio/mpeg" 
                onTimeUpdate={(e) => updateAudio(e)}
                onEnded={onEnd} >
            </audio>

            {/* <div className="music__player-artist">
                <div className="music__player-artist-wrap">
                    <img src={song.cover} alt=""/>
                </div>
            </div> */}

            <div className="music__player-controls">
                <i className="fas fa-backward" id="play_prev" onClick={() => console.log(song)}></i>

                <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`} 
                    onClick={() => dispatch(setStart(!start))}>
                </i>
                
                <i className="fas fa-forward" id="play_next" onClick={() => console.log(song)}></i>
            </div>

            <div className="music__player-song-desk">
                <span className="music__player-song-desk-name">{song && song.name}</span>
                <span className="music__player-song-desk-artist">{song && song.artist_name}</span>
            </div>

            <span className="music__player-toFull">
                <i className={`fas fa-chevron-${!full ? "up" : "down"}`} onClick={() => {
                    song && song.hasOwnProperty("src") && dispatch(setFullPlayer(!full))
                }}></i>
            </span>

            <div className="music__player-timeline">
                <span id="music-time_now">{ currentDuration }</span>

                <input 
                    type="range" 
                    name="progressBar" 
                    id="music-range" 
                    disabled={!song && true}
                    value={inputDuration}
                    onChange={handleProgress} />

                <span id="music-time_total">{song && song.duration}</span>
            </div>  

            <div className="music__player-bar">

                <span className="music__player-volume">
                    <i className={`fas fa-volume-${(stateVolume > 0) ? `up` : `off`}`} onClick={() => (stateVolume === 0) ? setStateVolume(5) : setStateVolume(0)}></i>
                    
                    <input 
                        type="range" 
                        value={Math.round(stateVolume * 10)} 
                        className="music__player-volume-range" 
                        onWheel={e => mouseWheel(e)}
                        onChange={(e) => setStateVolume(e.target.value / 10)} />
                </span>
                
                <span onClick={() => alert("saved")}>
                    <i className={`fa${song && song.saved ? "s" : "r"} fa-heart`}></i>
                </span>

                <span onClick={() => setFullScreen(!fullScreen)}  className="music__player-full">
                    {/* <img src={repeatIcon} alt="repeat all" id="repeat_all"/> */}
                    <i className={`fas fa-${!fullScreen ? "expand" : "compress"}`}></i>
                </span>

                <span onClick={() => {
                    audio.current.currentTime = 0;
                    audio.current.play();
                }}>
                    <i className="fas fa-redo-alt"></i>
                </span>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        start: state.onPlay.start,
        song: state.onPlay.song,
        songFrom: state.onPlay.songFrom,
        currentDuration: state.onPlay.currentDuration,
        full: state.interface.fullPlayer
    }
}

export default connect(mapStateToProps)(Player);