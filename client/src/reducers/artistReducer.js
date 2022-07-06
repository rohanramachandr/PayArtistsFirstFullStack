import { FETCH_ARTIST_ALBUMS, FETCH_ARTIST_INFO, FETCH_ARTIST_SONGS, RESET_ARTIST_PAGE, UPLOAD_ALBUM, UPLOAD_SONGS} from '../actions/types';
const initState = {albums: [], info: null, songs: []};

export default function artistReducer(state=initState, action) {
    switch (action.type) {
        case FETCH_ARTIST_INFO:
          
            return {...state, info: action.payload};
        case FETCH_ARTIST_ALBUMS:
            return {...state, albums: action.payload};
        case UPLOAD_ALBUM:
            return {...state, albums: [...state.albums, action.payload]}
        case UPLOAD_SONGS:
            return {...state, songs: [...state.songs, ...action.payload]}
        case FETCH_ARTIST_SONGS:
            return {...state, songs: action.payload};
        case RESET_ARTIST_PAGE:
            return initState;
        default:
            return state;
    }

}