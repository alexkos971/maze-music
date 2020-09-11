import React from 'react';
import '../../Main.scss';

const Artist = (props) => {

    let data = props.location.data;
    return (
        <div className="music__main-artist">
            <h2 className="subtitle">{data.name}</h2>
        </div>
    );
}

export default Artist;