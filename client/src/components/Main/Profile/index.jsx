import React from 'react';
import { connect } from 'react-redux';

import { useHttp } from '../../../hooks/http.hook';


const Profile = ({ dispatch, profile }) => {
    const { loading } = useHttp();


    if (loading && profile) {
        return (
            <h1 className="load_title">Loading...</h1>
        );
    }

    return (
        <div className="music__profile">
            <h1 className="subtitle">You Profile</h1>

            <h1>{profile.name}</h1>

            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(Profile);