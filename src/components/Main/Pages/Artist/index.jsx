import React, { useEffect, useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from "react-redux";
import config from "../../../../assets/config.json";

import SongsTemp from "../../SongsTemp"
import CardsTemp from "../../CardsTemp"
import './Artist.scss';

import { useHttp } from '../../../../hooks/http.hook';

const Artist = ({ recomendArtists, recomendSongs }) => {
    
    const [artist, setArtist] = useState({});
    let id = useParams().id;
    const {request, loading} = useHttp();


    
    const getArtist = useCallback(async () => {
        try {
            const data = await request(`/api/users/artist/${id}`, 'GET');
            if (data) {
                let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${data.name}&api_key=${config.lastfm_key}&format=json`
                
                const info = await request(url, 'GET')
        
                if (info.artist !== undefined) {
                    setArtist({...data, info: info.artist.bio.content, info_large: (info.artist.bio.content).substring(0, 300) + '...'});
                    return;
                }
                else {
                    setArtist({...data, info: 'There is no information about this artist', info_large: 'There is no information about this artist'});
                    return;
                }
            }
            else {
                return <h1>Not found...</h1>    
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [request, id]);
    
    useEffect(() => {
        getArtist();
    }, [getArtist])
    

    if (loading) {
        return (
            <h1 className="load_title">Loading...</h1>
        );
    }

        
    return (
        <div className="music__main-artist">

            <div className="music__main-artist-header">
                <div className="music__main-artist-header-desc">

                    <h1 className="music__main-artist-header-desc-name">{artist.name}</h1>
                    <span className="music__main-artist-header-desc-about">{artist.info_large}</span>

                    <div className="music__main-artist-header-desc-info">
                            <Link className="music__main-artist-header-desc-info-genre" to={`/Genre/Pop`}>
                                Pop music
                            </Link>

                            <span className="middot">&middot;</span>

                            {/* <span className="music__main-artist-header-desc-info-listeners">{(artist.listenings/100000).toFixed(1)}M listeners</span> */}
                            <span className="music__main-artist-header-desc-info-listeners">69M listeners</span>

                            <span className="middot">&middot;</span>
                            
                            {/* <span className="music__main-artist-header-desc-info-albums">{artist.albums.length && artist.albums.length} albums</span> */}
                            <span className="music__main-artist-header-desc-info-albums">14 albums</span>
                    </div>
                    
                    <div className="music__main-artist-header-desc-btns">
                        <span className="music__main-artist-header-desc-btns-follow">
                            <i className="fas fa-bookmark"></i>
                            <span>Follow</span>
                        </span>

                        <span className="music__main-artist-header-desc-btns-listen">
                            <i className="fas fa-play"></i>
                            <span>Listen</span>
                        </span>
                    </div>
                </div>

                <div className="music__main-artist-header-avatar">
                    <img src={artist.avatar} alt=""/>
                </div>
            </div>
            
            {/* <div className="music__main-artist-albums">
            { recomendArtists.length && 
                <div>
                    <h2 className="subtitle">Artists for you</h2>

                    <CardsTemp items={recomendArtists} to="Artist"/>
                </div>
            }
            </div> */}

                { recomendSongs.length &&
                    <div className="music__main-artist-songs">
                        <h2 className="subtitle">Most popular songs</h2>
                        <SongsTemp songs={recomendSongs}/>
                    </div>
                }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        recomendArtists: state.artists.recomendArtists,
        recomendSongs: state.songs.recomendSongs
    }
}

export default connect(mapStateToProps)(Artist);