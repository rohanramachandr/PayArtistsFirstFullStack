import { FETCH_PLAYLIST, FETCH_SONG_DETAILS } from '../actions/types';

export default function songReducer(state={songDetails: null, playlist: []}, action) {
    switch (action.type) {
        case FETCH_SONG_DETAILS:
            return {...state, songDetails: action.payload};
        case FETCH_PLAYLIST:
            return {...state, playlist: action.payload};
            
        default:
            return state;
    }

}