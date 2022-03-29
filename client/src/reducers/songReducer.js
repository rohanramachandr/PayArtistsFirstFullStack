import { FETCH_PLAYLIST, FETCH_SONG_DETAILS, SET_CLICK_INDEX, SET_PLAYLIST, SET_PLAYLIST_INDEX } from '../actions/types';

export default function songReducer(state={songDetails: null, playlist: [], index: null, clickIndex: null}, action) {
    switch (action.type) {
        case FETCH_SONG_DETAILS:
            return {...state, songDetails: action.payload};
        case FETCH_PLAYLIST:
            var tempArray = [];
            action.payload.forEach((obj) => {
                tempArray.push(obj._id);
            })
            return {...state, playlist: [...tempArray]};
        case SET_PLAYLIST:
            return {...state, playlist: [...action.payload]};
        case SET_PLAYLIST_INDEX:
            return {...state, index: action.payload};
        case SET_CLICK_INDEX:
            return {...state, clickIndex: action.payload};
        default:
            return state;
    }

}