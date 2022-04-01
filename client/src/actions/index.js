import axios from 'axios';
import { FETCH_ALBUMS, FETCH_USER, FETCH_ALBUM, FETCH_ALBUM_GENRE, FETCH_ALBUM_ARTIST, FETCH_ALBUM_SONGS, FETCH_SONG_DETAILS, UPDATE_SONG_PLAYS, FETCH_PLAYLIST, SET_PLAYLIST, SET_PLAYLIST_INDEX, SET_CLICK_INDEX } from './types';

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchAlbums = () => async dispatch => {

    const res = await axios.get('/api/albums');

    dispatch({ type: FETCH_ALBUMS, payload: res.data });

};

export const fetchAlbum = (albumId) => async dispatch => {

    const res = await axios.get(`/api/albums/${albumId}`);

    dispatch({ type: FETCH_ALBUM, payload: res.data });

};

export const fetchAlbumGenre = (albumId) => async dispatch => {

    const res = await axios.get(`/api/albums/${albumId}/genre`);

    dispatch({ type: FETCH_ALBUM_GENRE, payload: res.data });

};

export const fetchAlbumArtist = (albumId) => async dispatch => {

    const res = await axios.get(`/api/albums/${albumId}/artist`);

    dispatch({ type: FETCH_ALBUM_ARTIST, payload: res.data });

};

export const fetchAlbumSongs = (albumId) => async dispatch => {

    const res = await axios.get(`/api/albums/${albumId}/songs`);

    dispatch({ type: FETCH_ALBUM_SONGS, payload: res.data });

};

export const fetchSongDetails = (songId) => async dispatch => {
    // console.log("fetchsong details url", `/api/song/details/${songId}`);

    const res = await axios.get(`/api/song/details/${songId}`);

    dispatch({ type: FETCH_SONG_DETAILS, payload: res.data });

};


export const fetchPlaylist = () => async dispatch => {
    const res = await axios.get("/api/songs/playlist");

    dispatch({type: FETCH_PLAYLIST, payload: res.data});
};

export const updateSongPlays = (songId) => async dispatch => {

    const res = await axios.patch(`/api/song/update-plays/${songId}`);

    dispatch({ type: UPDATE_SONG_PLAYS, payload: res.data });

};

export const setPlaylist = (playlist) => {
    
    return {
        type: SET_PLAYLIST,
        payload: playlist
    };
};

export const setPlaylistIndex = (index) => {
    
    return {
        type: SET_PLAYLIST_INDEX,
        payload: index
    };
};

export const setClickIndex = (index) => {
    console.log("Setting CLick Index in action", index);
    return {
        type: SET_CLICK_INDEX,
        payload: index
    };
};



