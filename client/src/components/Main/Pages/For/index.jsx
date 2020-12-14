import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { useHttp } from '../../../../hooks/http.hook';
// import { Context } from '../../../../context'

import './For.scss';
import { leftIcon, rightIcon, downloadIcon } from '../../images';

const For = ({ nowSong, setPrevSong, setNextSong, save, onSaveSong, onSavePlaylist, startSong, playSong, timeTemplate, me }) => {

    const [songList, setSongList] = useState([]);
    const [artists, setArtists] = useState([]);
    const [dur, setDur] = useState({});
    const { loading, request } = useHttp();

    // Get list of songs
    const getSongs = useCallback(async () => {
        try {
            const data = await request('/api/songs/recomendation', 'GET');
            setSongList(data);
        }
        catch (e) {}
    } ,[request]);

    useEffect(() => {
        getSongs();
    }, [getSongs]);



    const getArtists = useCallback(async () => {
        const data = await request('/api/data/artists', 'GET');
        setArtists(data);
    } , [request]);

    useEffect(() => {
        getArtists();
    }, [getArtists]);


    // For slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        prevArrow: <div className="slider-arrow slick-prev">
                        <img src={leftIcon} alt="leftIcon"/>
                    </div>,
        nextArrow: <div className="slider-arrow slick-next">
                        <img src={rightIcon} alt="rightIcon"/>
                    </div>,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1
      };

    if (loading) {
        return (
            <h1 className="load_title">Loading...</h1>
        );
    }

    return (
        <div className="music__main-for">
            <h2 className="subtitle">Artists for you</h2>

                <Slider {...settings}>
                {!loading && artists.map(item => {
                    return (
                            <div className="music__main-for-slider-item" key={item.name}>
                                <Link to={`Artist:${item._id}`}>
                                    <img src={item.img} alt="" className="slider_img" />
                                    <h2 className="music__main-for-slider-item_artist">{item.name}</h2>
                        
                                    <div className="music__main-for-slider-item_desk">
                                        <span>{item.albums.length} Albums | </span>
                                        <span>{(item.listenings/100000).toFixed(1)}M Followers</span> 
                                    </div>    
                                </Link>        
                            </div> 

                        );
                    })
                }
                </Slider>

            <div className="music__main-songs">
                <div className="music__main-songs-nav">
                    <h2 className="subtitle">Music for you</h2>

                    <div className="music__main-songs-nav-bar">
                        <span onClick={() => onSavePlaylist(save, {
                            "name": "Most popular",
                            "cover": nowSong.cover,
                            "data": songList
                        })}>
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

                <ol className="music__main-songs-list">
                    {!loading && me && 
                        songList.map((item, index) => {

                            if(!(item._id in dur)){
                                let audio = new Audio();
                                audio.src = item.src;
                                
                                // getTimeSong(item);

                                audio.oncanplay = (e) => {
                                    let obj = dur;
                                    obj[item._id] = e.target.duration
                                    setDur(obj);
                                }
                            }

                            return (
                                <li key={item._id} id={(nowSong._id === item._id) ? "now_play" : ''}>
                                    <i className={`fas fa-${(startSong && nowSong._id === item._id)  ? "pause" : "play"}-circle play_btn`} 
                                        onClick={() => {
                                            playSong(!startSong, item);
                                            setPrevSong(songList[index - 1]);
                                            setNextSong(songList[index + 1]);
                                        }}>
                                    </i>

                                    <span className="music__main-songs-list_name">
                                        <Link to={`Artist:${item.artist[1]}`} className="music__main-songs-list-link">
                                            {item.artist[0]}
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
                                            onClick={() => onSaveSong(item._id)}>
                                            <i className={`fa${me.saved.songs.indexOf(item._id) ? "r" : "s"} fa-heart`}></i>
                                        </span>
                                        
                                        <span className="music__main-songs-list_right-time_now">
                                            {timeTemplate(dur[item._id])}
                                        </span>
                                    </div>

                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        </div>
        
    )
}

export default For;