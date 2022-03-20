import { FETCH_SONG_DETAILS } from '../actions/types';

export default function songReducer(state={}, action) {
    switch (action.type) {
        case FETCH_SONG_DETAILS:
            return {...state, songDetails: action.payload};
        default:
            return state;
    }

}