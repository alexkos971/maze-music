import React, { useEffect } from 'react';
import './Artist.scss';

import Slider from 'react-slick';


import { photoImg, glassesImg, lampImg, orangeImg, cameraImg, guitarImg } from '../images';

const Artist = ({ artists, songs, setNowSong, start, setStart, timeTemplate }) => {

    const playSong = (play, item) => {
        setStart(play);
        let now = {
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
        prevArrow: <div className="slider__arrow slick-prev">
                        <i className="fas fa-chevron-left"></i>
                    </div>,
        nextArrow: <div className="slider__arrow slick-next">
                        <i className="fas fa-chevron-right"></i>
                    </div>,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1
      };


    return (
        <div className="music__main-artist">
            <h2 className="subtitle">Most popular artist</h2>

                <Slider {...settings}>
                {artists.map(item => {
                    return (
                            <div className="music__main-artist-slider-item" key={item.name}>
                                <a href={item.url}>
                                    <img src={photoImg} alt="" className="slider_img"/>
                                    <h2 className="music__main-artist-slider-item_artist">{item.name}</h2>

                                    <div className="music__main-artist-slider-item_desk">
                                        <span>23 Albums | </span>
                                        <span>{(parseInt(item.listeners)/100000).toFixed(1)}M Followers</span> 
                                    </div>    
                                </a>        
                            </div> 
                        );
                    })
                }
                </Slider>
        
            
            <div className="music__main-artist-songs">
                <div className="music__main-artist-songs-nav">
                    <h3>This Week: Most Popular Music</h3>

                    <div className="music__main-artist-songs-nav-bar">
                        <span>
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

                <ol className="music__main-artist-songs-list">
                    {
                        songs.map(item => {

                            let audio = new Audio();
                            audio.src = item.src;
                            
                            let time = "03:45";

                            return (
                                <li key={item.src}>
                                    <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`} 
                                        onClick={() => playSong(!start, item)}>
                                    </i>
                                    <span className="music__main-artist-songs-list_name">{`${item.artist} - ${item.name}`}</span>

                                    <span className="music__main-artist-songs-list-time_now">
                                        {time}
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

export default Artist;