import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Artist.scss';

import { useHttp } from '../../../../hooks/http.hook';

const Artist = ({ }) => {
    
    let id = useParams().id;
    const {request, loading} = useHttp();

    const [artist, setArtist] = useState({});

    const getArtist = useCallback(async () => {
        const data = await request(`/api/data/artist/${id.slice(1)}`, 'GET');
        setArtist(data);
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

            <div className="music__main-artist-desk">
                <img src={artist.avatar} alt=""/>
                
                <h1>{artist.name}</h1>

                <span>listeners: {(artist.listenings/100000).toFixed(1)}M </span>
                <span>albums: {artist.albums}</span>
            </div>
            
        </div>
    );
}

export default Artist;