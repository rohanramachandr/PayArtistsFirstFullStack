import { useParams } from "react-router-dom";
import "./Album.css";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import React ,{ useEffect } from "react";
import { Link } from "react-router-dom";
import SongsSection from "../Subcomponents/SongsSection";



const Album = ({
  album,
  fetchAlbum,
  fetchAlbumGenre,
  resetAlbumPage,
  fetchAlbumArtist,
  fetchAlbumSongs,

  
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
              <SongsSection songs={album.songs} artistName={album.artist?.artistName}/>
            </div>
          </div>
        </div>
     
  );
};

function mapStateToProps({ album, song }) {
  return { album, playlist: song.playlist };
}

export default connect(mapStateToProps, actions)(Album);
