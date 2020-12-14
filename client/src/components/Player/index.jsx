import React, { useState,  useEffect, useRef, useCallback } from 'react';

import './Player.scss';
// import repeatIcon from '../../assets/img/repeat.png';

// import axios from 'axios';


const Player = ({ view, viewState, nowSong, setNowSong, prevSong, nextSong, startSong, setStartSong, playSong, timeTemplate, save, onSaveSong, fullScreen, setFullScreen }) => { 
    const [stateVolume, setStateVolume] = useState(5);
    const [dur, setDur] = useState(0);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        audio.current.volume = stateVolume / 100;
    }, [stateVolume]);
    

    const songTime = s => {
        let temp = timeTemplate(s);
        return temp;
    }  

    // Play Audio
    const audio = useRef('audio_tag');
    let onPlay = useCallback(startSong => {
        setDur(audio.current.duration);
        if (startSong) {
            audio.current.play();
        }
        else {
            audio.current.pause();
        }
        setStartSong(startSong);
    }, [setStartSong])

    useEffect(() => {
        onPlay(startSong);
    }, [startSong, nowSong, onPlay]);
    
    
    const handleProgress = e => { 
        let compute = (e.target.value * dur) / 100;
        setCurrent(compute); 
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
                src={nowSong.src} 
                ref={audio} 
                type="audio/mpeg" 
                onTimeUpdate={(e) => setCurrent(e.target.currentTime)} 
                onCanPlay={(e) => setDur(e.target.duration)} >
            </audio>

            {/* <div className="music__player-artist">
                <div className="music__player-artist-wrap">
                    <img src={song.cover} alt=""/>
                </div>
            </div> */}

            <div className="music__player-controls">
                <i className="fas fa-backward" id="play_prev" onClick={() => setNowSong(prevSong)}></i>

                <i className={`fas fa-${startSong ? "pause" : "play"}-circle play_btn`} 
                    onClick={() => onPlay(!startSong)}>
                </i>
                
                <i className="fas fa-forward" id="play_next" onClick={() => setNowSong(nextSong)}></i>
            </div>

            <i className={`fas fa-chevron-${!viewState ? "up" : "down"}`} onClick={() => {
                nowSong.hasOwnProperty("src") && view(!viewState)
            }}></i>

            <div className="music__player-timeline">
                <span id="music-time_now">{songTime(current)}</span>

                <input 
                    type="range" 
                    name="progressBar" 
                    id="music-range" 
                    value={dur ? (current * 100) / dur: 0}
                    onChange={handleProgress} />

                <span id="music-time_total">{songTime(dur)}</span>
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
                
                <span onClick={() => onSaveSong(save, nowSong.id, nowSong)}>
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

export default Player;