import { combineReducers } from 'redux';
import authReducer from './authReducer';
import albumsReducer from './albumsReducer';
import albumReducer from './albumReducer';
import songReducer from './songReducer';
import artistReducer from './artistReducer';

export default combineReducers({
   auth: authReducer,
   albums: albumsReducer,
   album: albumReducer,
   song: songReducer,
   artist: artistReducer
});