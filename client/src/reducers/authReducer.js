import { FETCH_USER, FETCH_USER_ARTIST_USERNAME } from '../actions/types';

export default function authReducer(state = null, action) {

    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        case FETCH_USER_ARTIST_USERNAME:
            return {...state, artistUsername: action.payload}
        default:
            return state;
    }
}