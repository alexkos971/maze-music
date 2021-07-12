import { 
    CHANGE_DIR,
    CHANGE_AUTH, 
    PLAY_SONG, 
    SET_START, 
    SET_SONG_DURATION, 
    ITEM_DURATION, 
    FETCH_RECOMEND_SONGS, 
    FETCH_RECOMEND_ARTISTS,
    FETCH_MY_SONGS,
    NOW_SONG, 
    SAVE_SONG, 
    SET_PROFILE,
    SET_FULLPLAYER,
    SET_NIGHT,
    SET_HEADER ,
    FETCH_MY_SAVED_SONGS,
    SWITCH_SONG
} from './types';

export const changeDir = (newDir) => {
    return {
        type: CHANGE_DIR,
        payload: newDir
    }
}

export const changeAuth = (newDir) => {
    return {
        type: CHANGE_AUTH,
        payload: newDir
    }
}

export const setFullPlayer = (state) => {
    return {
        type: SET_FULLPLAYER,
        payload: state
    }
}

export const setNight = () => {
    return {
        type: SET_NIGHT
    }
}

export const setHeader = (state) => {
    return {
        type: SET_HEADER,
        payload: state
    }
}

export const onPlay = (item, list) => {
    return async( dispatch, getState)  => {
        
        if (getState().onPlay.song._id === item._id) {   
            return dispatch({
                type: PLAY_SONG,
                song: item,
                list: list
            })
        }
        else {
            await dispatch(setNowSong(item));
            await dispatch({
                type: PLAY_SONG,
                song: item,
                list: list
            })
            dispatch({
                type: SET_START,
                payload: true
            });
        }
    }
}

export const setStart = (start) => {
    return {
        type: SET_START,
        payload: start
    }
}

export const switchSong = (direction, list) => {
    return {
        type: SWITCH_SONG,
        to: direction,
        list: list
    }
}

// set every second of track
export const setDuration = (dur) => {
    return {
        type: SET_SONG_DURATION,
        payload: dur
    }
}

// full duration of track
export const itemDuration = (dur) => {
    return {
        type: ITEM_DURATION,
        payload: dur
    }
}

export const setNowSong = (song) => {
    return {
        type: NOW_SONG,
        payload: song
    }
}

export const saveSong = (item) => {
    // return async (dispatch, getState) => {

        return {
            type: SAVE_SONG,
            payload: item
        }
    // }
}

export const setProfile = (data) => {
    return {
        type: SET_PROFILE,
        payload: data
    }
}

export const getMySongs = (data) => {
    return {
        type: FETCH_MY_SONGS,
        payload: data
    }
}

export const getRecomendSongs = (data) => {
    return async (dispatch, getState) => {

        // await dispatch({type: NOW_SONG, payload: result[0] })

        return dispatch({
            type: FETCH_RECOMEND_SONGS,
            payload: data,
            saved: await getState().profile.profile.saved_songs
        })
    }
}

export const getRecomendArtists = (data) => {
    return {
        type: FETCH_RECOMEND_ARTISTS,
        payload: data
    }
}

export const setSavedSongs = (data) => {
    return async (dispatch, getState) => {

        if (!data) return [];
        let result = data.map(item => {
        
            dispatch(itemDuration(item.src))   

            item.dur = getState().getDuration.itemDuration;
            return item;
        });

        // await dispatch({type: NOW_SONG, payload: result[0] })

        return dispatch({
            type: FETCH_MY_SAVED_SONGS,
            payload: result,
        })
    }
}
