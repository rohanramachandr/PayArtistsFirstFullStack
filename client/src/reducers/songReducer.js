import { SET_CURRENT_SONG_ID } from '../actions/types';

export default function songReducer(state={currentSongId:""}, action) {
    switch (action.type) {
        case SET_CURRENT_SONG_ID:
            return {...state, currentSongId: action.payload};
        default:
            return state;
    }

}