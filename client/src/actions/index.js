import axios from 'axios';
import { FETCH_ALBUMS, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchAlbums = () => async dispatch => {

    const res = await axios.get('/api/albums');

    dispatch({ type: FETCH_ALBUMS, payload: res.data });

};

