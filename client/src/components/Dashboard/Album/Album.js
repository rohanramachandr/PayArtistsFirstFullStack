import { useParams } from "react-router-dom";
import "./Album.css";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import React ,{ useEffect } from "react";
import { Link } from "react-router-dom";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const Album = ({
  album,
  fetchAlbum,
  fetchAlbumGenre,
  resetAlbumPage,
  fetchAlbumArtist,
  fetchAlbumSongs,
  currentSongId
  
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
      <img src={process.env.REACT_APP_ARTWORK_BUCKET_URL + album.album.artworkPath} alt="album art" />
    ) : null;
  };

  const renderAlbumTitle = () => {
    return album.album ? <h2>{album.album.albumTitle}</h2> : null;
  };

  const renderArtistName = () => {
    return album.artist?.artistUsername ? <Link className='link' to={`/${album.artist.artistUsername}`}><span>{`By ${album.artist.artistName}`}</span></Link> : null;
  };

  const renderNumSongs = () => {
    return album.songs ? <span>{album.songs.length !== 1 ? `${album.songs.length} songs` : `${album.songs.length} song`}</span> : null;
  };




  const renderPlayingButtons = (albumSongs, index, order) => {
    if (currentSongId === albumSongs[index]) {
      return (
        <div className="playingIcon">
          <VolumeUpRoundedIcon color="inherit"/>
        </div>
      );


    }

    return (

      <>
        <div onClick={() => {
         
          const customEvent = new CustomEvent('songClicked', { detail: { playlist: albumSongs, clickIndex: index } });
          document.dispatchEvent(customEvent);
          
          
        }} className="playIcon">
          <PlayArrowRoundedIcon color="inherit" />
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
          
              <span className="artistName">{album.artist?.artistName}</span>
      
          </div>
          {/* <div className="trackOptions">
            <div className="optionsIcon">
              <MoreHorizRoundedIcon color="inherit"/>
            </div>
          </div> */}
          <div className="trackDetails">
                         <span className="trackPrice">{'$' + song.price}</span>
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
  return { album, playlist: song.playlist, currentSongId: song.currentSongId };
}

export default connect(mapStateToProps, actions)(Album);
