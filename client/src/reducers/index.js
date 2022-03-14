import { combineReducers } from 'redux';
import authReducer from './authReducer';
import albumsReducer from './albumsReducer';

export default combineReducers({
   auth: authReducer,
   albums: albumsReducer
});