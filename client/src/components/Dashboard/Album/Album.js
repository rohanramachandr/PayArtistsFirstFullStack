import { useParams } from "react-router-dom";
import "./Album.css";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import React ,{ useEffect } from "react";
import { BsFillPlayFill, BsThreeDots, BsVolumeUpFill as Volume } from "react-icons/bs";
const Album = ({
  album,
  fetchAlbum,
  fetchAlbumGenre,
  resetAlbumPage,
  fetchAlbumArtist,
  fetchAlbumSongs,
  setPlaylist,
  setClickIndex,
  playlist,
  playlistIndex
}) => {
  const { albumId } = useParams();



  useEffect(() => {
    fetchAlbum(albumId);
    fetchAlbumGenre(albumId);
    fetchAlbumArtist(albumId);
    fetchAlbumSongs(albumId);

    return () => {
      resetAlbumPage();
    };
  }, [albumId, fetchAlbum, fetchAlbumGenre, fetchAlbumArtist, fetchAlbumSongs, resetAlbumPage]);

  const renderArtwork = () => {
    return album.album ? (
      <img src={album.album.artworkPath} alt="album art" />
    ) : null;
  };

  const renderAlbumTitle = () => {
    return album.album ? <h2>{album.album.albumTitle}</h2> : null;
  };

  const renderArtistName = () => {
    return album.artist ? <span>{`By ${album.artist}`}</span> : null;
  };

  const renderNumSongs = () => {
    return album.songs ? <span>{`${album.songs.length} songs`}</span> : null;
  };

  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);


  const renderPlayingButtons = (albumSongs, index, order) => {
    if (equals(albumSongs, playlist) && playlistIndex === index) {
      return (
        <div className="playingIcon">
          <Volume color="#ec148c" size={20} alt="Volume" />
        </div>
      );


    }

    return (

      <>
        <div onClick={() => {
          if (!equals(albumSongs, playlist)) {
            setPlaylist(albumSongs);
          }
         
          
          setClickIndex([index]);
          
          
        }} className="playIcon">
          <BsFillPlayFill size={20} />
        </div>

        <span className="trackNumber">{order}</span>
      </>


    );

  };

  const renderSongs = () => {
    //TODO perhaps change to get artist name from song instead of album
    var listOfSongIds = [];
    album.songs.forEach((song) => { listOfSongIds.push(song._id) });
    return album.songs.map((song, index) => {
      return (
        <li className="tracklistRow" key={song._id}>
          <div className="trackCount">
            {renderPlayingButtons(listOfSongIds, index, song.albumOrder)}


          </div>
          <div className="trackInfo">
            <span className="trackName">{song.songTitle}</span>
            <span className="artistName">{album.artist}</span>
          </div>
          <div className="trackOptions">
            <div className="optionsIcon">
              <BsThreeDots size={20} />
            </div>
          </div>
          <div className="trackDuration">
            <span className="duration">{song.duration}</span>
          </div>
        </li>
      );
    });
  };

  return (
   

        <div id="mainViewContainer">
          <div id="mainContent">
            <div className="entityInfo">
              <div className="leftSection">{renderArtwork()}</div>
              <div className="rightSection">
                {renderAlbumTitle()}
                <p>{renderArtistName()}</p>
                <p>{renderNumSongs()}</p>
              </div>
            </div>

            <div className="trackListContainer">
              <ul className="tracklist">{renderSongs()}</ul>
            </div>
          </div>
        </div>
     
  );
};

function mapStateToProps({ album, song }) {
  return { album, playlist: song.playlist, playlistIndex: song.index };
}

export default connect(mapStateToProps, actions)(Album);