import React, { useState } from 'react';
import './Upload.scss';
import { connect } from 'react-redux';
import { itemDuration, getMySongs } from '../../../../redux/actions';

import { useHttp } from '../../../../hooks/http.hook';
import { useMessage } from '../../../../hooks/message.hook';
import { useAuth } from '../../../../hooks/auth.hook';

const Upload = ({ dispatch, duration, songs }) => {
    
    const { loading, request } = useHttp();
    const message = useMessage();
    const { token } = useAuth();
    const [form, setForm] = useState({})

    let audio = new Audio();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });

        if (form.src) {
            audio.src = form.src;
            
            audio.onloadeddata = async () => {
                await dispatch(itemDuration(audio.duration));
                
                if (duration) {
                    setForm({ ...form, duration: duration })
                }
            }
        }
    }
    
    const uploadHandler = async () => {
        try {
            if (form.name === undefined) {
                message('Некоторые поля не заполненны');
                // return;
            }
            if (!form.duration) {
                message('Произошла ошибка, не удалось установить длительность трека');
            }
            let data = await request('api/songs/upload', 'POST', {...form}, {
                Authorization: `Bearer ${token}`
            });

            if (data) {
                const newData = songs.push(data.track)
                await dispatch(getMySongs(newData))
                console.log(songs)
                message(data.message)
                // dispatch(getMySongs(newData));
            }
        }
        catch (e) {
            message(e.message);
        }
    }

    return (
        <div className="music__main-upload">
            <h2 className="subtitle">Upload  track</h2>

            <p>Fill the fields</p>

            <div className="music__main-upload-fields">
                
                <form id="uploadTrack">
                    <input type="text" name="name" required={true} onChange={changeHandler} placeholder="name of track"/>

                    {/* <input type="text" name="artist_id" required onChange={changeHandler} placeholder="track author link"/> */}
                    <input type="text" name="album_id" onChange={changeHandler}  placeholder="track album link"/>
                
                    <input type="text" name="src" required onChange={changeHandler} placeholder="track link"/>

                    <input type="text" name="lyrics" onChange={changeHandler} placeholder="track lyrics"/>

                    <input type="text" name="cover" onChange={changeHandler} placeholder="track cover"/>
                </form>

                <button type="submit" onClick={uploadHandler} disabled={loading}>Upload</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        duration: state.onPlay.itemDuration,
        songs: state.songs.mySongs
    }
}

export default connect(mapStateToProps)(Upload);