import axios from 'axios';
import { FETCH_ALBUMS, FETCH_USER, RESET_ARTIST_PAGE, FETCH_ALBUM, FETCH_ALBUM_GENRE, FETCH_ALBUM_ARTIST, FETCH_ALBUM_SONGS, UPDATE_SONG_PLAYS, RESET_ALBUM_PAGE, FETCH_ARTIST_INFO, FETCH_ARTIST_SONGS, FETCH_ARTIST_ALBUMS, SET_CURRENT_SONG_ID, FETCH_USER_ARTIST_USERNAME } from './types';

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchUserArtistUsername = () => async dispatch => {

    const res = await axios.get('/api/current_artist');

    dispatch({ type: FETCH_USER_ARTIST_USERNAME, payload: res.data });

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

export const resetAlbumPage = () => {

    return {
        type: RESET_ALBUM_PAGE,
        payload: null
    };
};

export const setCurrentSongID = (id) => {

    return {
        type: SET_CURRENT_SONG_ID,
        payload: id
    }
};



export const updateSongPlays = (songId) => async dispatch => {

    if (songId) {
        const res = await axios.patch(`/api/song/update-plays/${songId}`);
        console.log("updated song plays", res.data)
        dispatch({ type: UPDATE_SONG_PLAYS, payload: res.data });
    }



};




export const fetchArtistInfo = (artistUsername) => async dispatch => {
    const res = await axios.get(`/api/artists/${artistUsername}`);
    dispatch({ type: FETCH_ARTIST_INFO, payload: res.data });
};

export const fetchArtistSongs = (artistUsername) => async dispatch => {
    const res = await axios.get(`/api/artists/${artistUsername}/songs`);
    dispatch({ type: FETCH_ARTIST_SONGS, payload: res.data });
};
export const fetchArtistAlbums = (artistUsername) => async dispatch => {
    const res = await axios.get(`/api/artists/${artistUsername}/albums`);
    dispatch({ type: FETCH_ARTIST_ALBUMS, payload: res.data });
};


export const createArtist = (artistName, artistUsername) => async dispatch => {
    const values = { artistName, artistUsername };
    const res = await axios.post('/api/artists/create', values);
    dispatch({ type: FETCH_USER, payload: res.data });

};


export const uploadMusic = (formData) => async dispatch => {
    // console.log("uploading music", formData.tracks[0].audioFile.type);
    // const uploadConfig = await axios.get('/api/music/upload');
    // await axios.put(uploadConfig.data.url, formData.tracks[0].audioFile, {
    //     headers: {
    //         'Content-Type': 'audio/wav'
    //     }
    // });

    console.log("uploading music", formData.tracks[0].audioFile);
    const uploadConfig = await axios.get('/api/music/upload');
    await axios.put(uploadConfig.data.url, formData.tracks[0].audioFile, {
        headers: {
            'Content-Type': formData.tracks[0].audioFile.type
        }
    });


    // artworkPath for post Album : uploadConfig.data.key 
    // const values = {artistName, artistUsername};
    // const res = await axios.post('/api/artists/create', values);
    // dispatch({ type: FETCH_USER, payload: res.data });

};




export const resetArtistPage = () => {

    return {
        type: RESET_ARTIST_PAGE,
        payload: null
    };
};






