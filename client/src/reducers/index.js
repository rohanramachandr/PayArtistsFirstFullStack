import { combineReducers } from 'redux';
import authReducer from './authReducer';
import albumsReducer from './albumsReducer';
import albumReducer from './albumReducer';

export default combineReducers({
   auth: authReducer,
   albums: albumsReducer,
   album: albumReducer
});