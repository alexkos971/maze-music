import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import { changeDir } from "../../../redux/actions";

import "./CardsTemp.scss";
import { leftIcon, rightIcon } from '../images';

const CardsTemp = ({dispatch, items, to, start }) => {


    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <div
            {...props}
            className={
              "slick-prev slick-arrow" +
              (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}>

            <img src={leftIcon} alt="left-con"/>
        </div>
    )
    
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <div
            {...props}
            className={
              "slick-next slick-arrow" +
              (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}>
            <img src={rightIcon} alt="right-con"/>
        </div>
    )
     // For slider
     const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        prevArrow: <SlickArrowLeft/>,
        nextArrow: <SlickArrowRight/>,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    if (to === "Artists") {
        return (
            <div className="music__main-slider">

                <span className="music__main-slider-view">View all</span>
                 <Slider {...settings}>
                    {items.map((item, index) => 
                        <div className="music__main-slider-item" key={index}>
                            {/* <div className="music__main-slider-item-hover">
                                <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`}>
                                </i>
                            </div>*/}
                            
                            <Link to={"/Artist/" + item._id} onClick={() => dispatch(changeDir('Artist'))}>
                                <img src={item.avatar} alt="" className="slider_img" />
                                <h2 className="music__main-slider-item_artist">{item.name}</h2>

                                <div className="music__main-slider-item_desk">
                                    <span>{item.albums.length} Albums | </span>
                                    <span>{(item.listenings/100000).toFixed(1)}M Followers</span> 
                                </div>    
                            </Link>         
                        </div> 
                    )}
                </Slider>
            </div>
        )
    }
    else if (to === "Albums") {
        return (
            <div className="music__main-slider">

                <span className="music__main-slider-view">View all</span>
                
                 <Slider {...settings}>
                    {items.map(item => {
                        return (
                            <div className="music__main-slider-item" key={item.name}>
                                <div className="music__main-slider-item-hover">
                                    <i className={`fas fa-${start ? "pause" : "play"}-circle play_btn`}>
                                    </i>
                                </div>

                                <Link to={to + "/" + item._id}>
                                    <img src={item.avatar} alt="" className="slider_img" />
                                    <h2 className="music__main-slider-item_artist">{item.name}</h2>

                                    <div className="music__main-slider-item_desk">
                                        <span>{item.listeners} listeners | </span>
                                        <span>{item.tracks.length} tracks</span> 
                                    </div>    
                                </Link>        
                            </div> 
                        );
                        })
                    }
                </Slider>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        start: state.onPlay.start,
        song: state.onPlay.song
    }
}

export default connect(mapStateToProps)(CardsTemp)