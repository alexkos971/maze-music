import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Slider from 'react-slick';
import axios from 'axios';

import './Artists.scss';

import Artist from '../Artist';

const Artists = ({ nowSong, setNowSong, saved, onSavePlaylist, start, setStart, timeTemplate }) => {

    const [songList, setSongList] = useState([]);
    const [artists, setArtists] = useState([]);
    const [dur, setDur] = useState({});
    // let history = useHistory();


    // Get list of songs
    useEffect(() => {
        axios.get("http://localhost:3001/songs/")
            .then(({ data }) => {
              setSongList(data); 
            })
    }, [nowSong]);

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

    // For slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        prevArrow: <div className="slider-arrow slick-prev">
                        <i className="fas fa-arrow-left"></i>
                    </div>,
        nextArrow: <div className="slider-arrow slick-next">
                        <i className="fas fa-arrow-right"></i>
                    </div>,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1
      };

    // Get list of artists
    useEffect(() => {
    //   const params = {
    //       api:  "b6927779e0a8d1da0ef48fa9a0924851",
    //       limit: 5,
    //   };
            
    //   axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${params.api}&format=json&limit=${params.limit}`)
    //     .then(({ data }) => {
    //       setArtists(data.artists.artist);
    //     });
        axios.get("http://localhost:3001/artists/")
            .then(({ data }) => {
                setArtists(data);
            });
    }, [start]);


    return (
        <div className="music__main-artists">
            <h2 className="subtitle">Most popular artist</h2>

                <Slider {...settings}>
                {artists.map(item => {
                    return (
                            <div className="music__main-artists-slider-item" key={item.name}>
                                <a href="/artist">
                                    <img src={item.img} alt="" className="slider_img"/>
                                    <h2 className="music__main-artists-slider-item_artist">{item.name}</h2>
                        
                                    <div className="music__main-artists-slider-item_desk">
                                        <span>23 Albums | </span>
                                        <span>{(parseInt(item.listeners)/100000).toFixed(1)}M Followers</span> 
                                    </div>    
                                </a>        
                            </div> 

                        );
                    })
                }
                </Slider>

            <Route path="/artist">
                <Artist/>
            </Route>    


            <div className="music__main-songs">
                <div className="music__main-songs-nav">
                    <h3>This Week: Most Popular Music</h3>

                    <div className="music__main-songs-nav-bar">
                        <span onClick={() => onSavePlaylist(saved, {
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
                    {
                        songList.map(item => {

                            if(!(item.id in dur)){
                                let audio = new Audio();
                                audio.src = item.src;
                                
                                audio.oncanplay = (e) => {
                                    let obj = dur;
                                    obj[item.id] = e.target.duration
                                    setDur(obj);
                                }
                            }

                            return (
                                <li key={item.id} id={(nowSong.id === item.id) ? "now_play" : ''}>
                                    <i className={`fas fa-${(start && nowSong.id === item.id)  ? "pause" : "play"}-circle play_btn`} 
                                        onClick={() => playSong(!start, item)}>
                                    </i>
                                    <span className="music__main-songs-list_name">{`${item.artist} - ${item.name}`}</span>

                                    <span className="music__main-songs-list-time_now">
                                        {timeTemplate(dur[item.id])}
                                    </span>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        </div>
        
    )
}

export default Artists;