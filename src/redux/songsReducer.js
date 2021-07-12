import { FETCH_RECOMEND_SONGS, FETCH_MY_SONGS } from './types';

let initialState = {
    recomendSongs: [],
    save: false,
    mySongs: []
}

const checkSaved = (savedSongs, songs) => {
    savedSongs.map(saved => {
        songs.map(recomend => {
            if (recomend._id === saved._id) {
                recomend.saved = true;
            }
            else {
                recomend.saved = false;
            }
            return recomend
        })
        return saved;
    })
    return songs;
}

export const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_SONGS:
            return { ...state, recomendSongs: checkSaved(action.saved, action.payload) };
        
        case FETCH_MY_SONGS:
            return { ...state, mySongs: action.payload };

        default: return state;
    }
}