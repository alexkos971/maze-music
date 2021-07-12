import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { getRecomendSongs, getRecomendArtists } from '../../../../redux/actions';

import SongsTemp from "../../SongsTemp";
import CardsTemp from "../../CardsTemp";

import { useHttp } from '../../../../hooks/http.hook';

import './For.scss';

const For = ({ dispatch, recomendSongs, recomendArtists,savedSongs }) => {
    
    const { loading, request } = useHttp();

    // // Get list of songs
    const getSongs = useCallback(async (list) => {
        try {
            if (!list.length) {
                let data = await request(`/api/songs/recomendation`, 'GET');
                    if (data && savedSongs) {
                        dispatch(getRecomendSongs(data))
                    }
                    else {
                        return <h1>Loading...</h1>
                    }
                }
                else {
                    dispatch(getRecomendSongs(list))
            }
        }
        catch (e) { console.error(e) }
    } ,[request, dispatch, savedSongs]);
    
    useEffect(() => {
        getSongs(recomendSongs);
    }, [dispatch, getSongs, recomendSongs]);
    

    
    const getArtists = useCallback(async (list) => {
        try {
            if (!list.length) {
                const data = await request('/api/users/artists', 'GET');
                
                if (data) {
                    dispatch(getRecomendArtists(data))
                }
                else {
                    return <h1>Loading...</h1>
                }
            }
            else {
                dispatch(getRecomendArtists(list))
            }
        }
        catch (e) { console.error(e) }
    } , [request, dispatch]);

    useEffect(() => {
        getArtists(recomendArtists);
    }, [dispatch, recomendArtists, getArtists]);




    if (loading) {
        return (
            <h1 className="load_title">Loading...</h1>
        );
    }

    return (
        <div className="music__main-for">
            
            { recomendArtists.length && 
                <div className="music__main-artist-artists">
                    <h2 className="subtitle">Artists for you</h2>
                    
                    <CardsTemp items={recomendArtists} to="Artists" />
                </div>
            }

            <div className="music__main-songs">
                <div className="music__main-songs-nav">
                    <h2 className="subtitle">Music for you</h2>

                    {/* <div className="music__main-songs-nav-bar">
                        <span onClick={() => onSavePlaylist(save, {
                            "name": "Most popular",
                            "cover": song.cover,
                            "data": recomendSongs
                        })}>
                            <i className="far fa-heart"></i>
                        </span>

                        <span>
                            <i className="far fa-plus-square"></i>
                        </span>

                        <span>
                            <i className="far fa-share-square"></i>
                        </span>
                    </div> */}
                </div>

                {recomendSongs &&
                    <SongsTemp songs={recomendSongs}/>
                }
            </div>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        start: state.onPlay.start,
        recomendSongs: state.songs.recomendSongs,
        recomendArtists: state.artists.recomendArtists,
        savedSongs: state.profile.profile.saved_songs,
        song: state.onPlay.song,
        save: state.songs.save
    }
}


export default connect(mapStateToProps)(For);