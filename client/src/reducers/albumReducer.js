import { FETCH_ALBUM, FETCH_ALBUM_ARTIST, FETCH_ALBUM_GENRE, FETCH_ALBUM_SONGS, RESET_ALBUM_PAGE } from '../actions/types';
const initState = {album: null, genre: null, artist: null, songs: []};

export default function albumReducer(state=initState, action) {
    switch (action.type) {
        case FETCH_ALBUM:
            return {...state, album: action.payload};
        case FETCH_ALBUM_GENRE:
            return {...state, genre: action.payload.genreName};
        case FETCH_ALBUM_ARTIST:
            return {...state, artist: action.payload};
        case FETCH_ALBUM_SONGS:
            return {...state, songs: action.payload};
        case RESET_ALBUM_PAGE:
            return initState;
        default:
            return state;
    }

}