import React, { useState,  useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { onPlay, getDuration, setDuration, setFullPlayer } from '../../redux/actions';

import './Player.scss';


const Player = ({ dispatch, start, full, song, duration, currentDuration,   save, onSaveSong, fullScreen, setFullScreen }) => { 

    const [stateVolume, setStateVolume] = useState(5);

    useEffect(() => {
        audio.current.volume = stateVolume / 100;
    }, [stateVolume]);
    

    // const songTime = s => {
    //     let temp = timeTemplate(s);
    //     return temp;
    // }  

    // Play Audio
    const audio = useRef('audio_tag');

    let onStartPlay = async () => {
        // await dispatch(setNowSong(song))

        if (start) {
            audio.current.play();
        }
        else {
            audio.current.pause();
        }
    }

    useEffect(() => {
        onStartPlay();
    }, [start, onStartPlay])

    
    
    const handleProgress = e => { 
        let compute = (e.target.value * duration) / 100;
        // setCurrent(compute); 
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

    return (
        <div className="music__player">

            <audio 
                src={song && song.src} 
                ref={audio} 
                type="audio/mpeg" 
                onTimeUpdate={(e) => dispatch(setDuration(e.target.currentTime))} 
                onCanPlay={(e) => dispatch(getDuration(e.target.duration))} >
            </audio>

            {/* <div className="music__player-artist">
                <div className="music__player-artist-wrap">
                    <img src={song.cover} alt=""/>
                </div>
            </div> */}

            <div className="music__player-controls">
                <i className="fas fa-backward" id="play_prev" onClick={() => console.log(song)}></i>

                <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`} 
                    onClick={() => dispatch(onPlay(song, start))}>
                </i>
                
                <i className="fas fa-forward" id="play_next" onClick={() => console.log(song)}></i>
            </div>

            <i className={`fas fa-chevron-${!full ? "up" : "down"}`} onClick={() => {
                song.hasOwnProperty("src") && dispatch(setFullPlayer(!full))
            }}></i>

            <div className="music__player-timeline">
                <span id="music-time_now">{ currentDuration }</span>

                <input 
                    type="range" 
                    name="progressBar" 
                    id="music-range" 
                    value={duration ? ((audio.current.duration * 100) / duration) : 0}
                    onChange={handleProgress} />

                <span id="music-time_total">{duration}</span>
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
                
                <span onClick={() => onSaveSong(save, song.id, song)}>
                    <i className={`fa${save ? "s" : "r"} fa-heart`}></i>
                </span>

                <span onClick={() => setFullScreen(!fullScreen)}>
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
        directory: state.changeDir.dir,
        start: state.onPlay.start,
        song: state.onPlay.song,
        currentDuration: state.getDuration.currentDuration,
        duration: state.getDuration.duration,
        full: state.interface.fullPlayer
    }
}

export default connect(mapStateToProps)(Player);