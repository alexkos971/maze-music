import { FETCH_RECOMEND_ARTISTS } from './types';

let initialState = {
    recomendArtists: [],
    save: false
}

// const checkSaved = (savedSongs, recomendSongs) => {
//     savedSongs.map(saved => {
//         recomendSongs.map(recomend => {
//             if (recomend._id === saved._id) {
//                 recomend.saved = true;
//             }
//             else {
//                 recomend.saved = false;
//             }
//             return recomend
//         })
//         return saved
//     })
//     return recomendSongs;
// }

export const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECOMEND_ARTISTS:
            return { ...state, recomendArtists: action.payload };
        default: return state;
    }
}