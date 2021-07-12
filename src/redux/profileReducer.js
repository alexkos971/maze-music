import { SET_PROFILE } from './types'

let initialState = {
    profile: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.payload }
        default: return state;
    }
}