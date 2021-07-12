import { PLAY_SONG, NOW_SONG, SWITCH_SONG, SET_SONG_DURATION, ITEM_DURATION, SET_START } from './types';


// Template of song time
let timeTemplate = s => {
    return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s);
}


const checkLocalStotage = async () => {
    let check = await localStorage.getItem('lastSong');
    
    if (!check) {
        localStorage.setItem('lastSong', {})
        check = localStorage.getItem('lastSong');
    }
    else {
        return JSON.parse(check);
    }
}

let initialState = {
    start: false,
    song: checkLocalStotage(),
    songFrom: [],
    currentDuration: '0:00',
    itemDuration: '0:00',
}

const switchSong = (to, list) => {
    list.map((item, index) => {
        if (initialState.song._id === item._id) {
            if (to === "next") {
                console.log(item)
                // return item[index + 1]
            }
            else if (to === "prev") 
                console.log(item)
            // return item[index - 1]
            }
            return item;
    })
    return list[0];
}

export const playReducer = (state = initialState, action) => {

    switch (action.type) {
        case PLAY_SONG:
            if (state.start) {
                return {...state, start: false };
            }
            else {
                return {...state, start: true }
            }
            
        
        case NOW_SONG:
            return { ...state, song: action.payload }
        
        case SWITCH_SONG: 
            return { ...state, song: switchSong(action.to, action.list) }
            
        case SET_SONG_DURATION:
            return {...state, currentDuration: timeTemplate(action.payload)}
    
        case ITEM_DURATION:
            return {...state, itemDuration: timeTemplate(action.payload)}
        case SET_START:
            return { ...state, start: action.payload }
                
        default: return state;
    }
}