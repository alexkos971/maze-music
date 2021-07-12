import React from 'react';
import { connect } from 'react-redux';
import './Settings.scss'

import { setProfile } from '../../../redux/actions';

import { useMessage } from '../../../hooks/message.hook'
import { useHttp } from '../../../hooks/http.hook';
import { useAuth } from '../../../hooks/auth.hook';

const Settings = ({ dispatch, profile }) => {
    
    const message = useMessage();
    const { request } = useHttp();
    const { token } = useAuth();

    const changeAvatar = async () => {
        let link = prompt('Paste the link of new avatar');
        
        if (!link) {
            return alert('Поле пустое !!!');
        }

        try {
            const avatar = await request('/api/changes/avatar', 'POST', { avatar: link }, {
                Authorization: `Bearer ${token}`
            })

            if (avatar) {
                message(avatar.message);
                dispatch(setProfile({...profile, avatar: avatar.avatar }))
            }
        }
        catch (e) {
            message(e.message)
        }
    }

    const changeName = async () => {
        let name = prompt('Paste the new name');
        
        if (!name.length) {
            return alert('Поле пустое !!!');
        }

        try {
            const newName = await request('/api/changes/name', 'POST', { name: name }, {
                Authorization: `Bearer ${token}`
            })

            if (newName) {
                message(newName.message);
                dispatch(setProfile({...profile, name: newName.name}))
            }
        }
        catch (e) {
            message(e.message)
        }
    }

    return (
        <div className="music__main-settings">

            <div className="music__main-settings-wrap">
                
                <div className="music__main-settings-wrap-avatar">
                    <div className="music__main-settings-wrap-avatar-img">
                        <img src={profile.avatar} alt=""/>
                    </div>

                    <span onClick={changeAvatar}>
                        <i className="fas fa-edit"></i>
                    </span>
                </div>

                

                <h2 className="subtitle">{profile.name} 
                
                    <span>
                        <i className="fas fa-pencil-alt" onClick={changeName}></i>
                    </span>
                </h2>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(Settings)