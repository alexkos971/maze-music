import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getRecomendSongs, onPlay, saveSong } from '../../../../redux/actions';

import Slider from 'react-slick';

import { useHttp } from '../../../../hooks/http.hook';

import './For.scss';
import { leftIcon, rightIcon, downloadIcon } from '../../images';

const For = ({ dispatch, start, songs, song, duration, save, onSaveSong, onSavePlaylist  }) => {
    
    const [artists, setArtists] = useState([]);
    const { loading, request } = useHttp();

    // Get list of songs
    const getSongs = useCallback(async () => {
        try {
            dispatch(getRecomendSongs(await request('/api/songs/recomendation', 'GET')))
        }
        catch (e) {}
    } ,[request]);

    useEffect(() => {
        getSongs();
    }, [getSongs, dispatch]);



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
            
            {artists.length && <div>
                <h2 className="subtitle">Artists for you</h2>

                <Slider {...settings}>
                {!loading && artists.map(item => {
                    return (
                            <div className="music__main-for-slider-item" key={item.name}>
                                <Link to={`Artist:${item._id}`}>
                                    <img src={item.avatar} alt="" className="slider_img" />
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
            </div>}

            <div className="music__main-songs">
                <div className="music__main-songs-nav">
                    <h2 className="subtitle">Music for you</h2>

                    <div className="music__main-songs-nav-bar">
                        <span onClick={() => onSavePlaylist(save, {
                            "name": "Most popular",
                            "cover": song.cover,
                            "data": songs
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
                    {!loading &&
                        songs.map((item, index) => {
                            
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
                            );
                        })
                    }
                </ol>
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        start: state.onPlay.start,
        duration: state.getDuration.itemDuration,
        songs: state.songs.recomendSongs,
        song: state.onPlay.song
    }
}


export default connect(mapStateToProps)(For);