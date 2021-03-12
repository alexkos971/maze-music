import { SET_FULLPLAYER, SET_NIGHT, SET_HEADER } from './types';

let initialState = {
    fullPlayer: false,
    night: JSON.parse(localStorage.getItem('userNight')),
    header: false
}

export const interfaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FULLPLAYER:
            return {...state, fullPlayer: action.payload}

        case SET_NIGHT:
            localStorage.setItem('userNight', !state.night);
            return {...state, night: !state.night};

        case SET_HEADER:
            return {...state, header: action.payload}

        default: return state;
    }
}