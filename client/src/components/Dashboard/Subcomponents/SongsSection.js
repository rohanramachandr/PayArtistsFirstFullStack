import React from "react";
import { connect } from "react-redux";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';


const SongsSection = ({ songs, artistName, currentSongId }) => {

  const renderPlayingButtons = (artistSongs, index, order) => {
    if (currentSongId === artistSongs[index]) {
      return (
        <div className="playingIcon">
          <VolumeUpRoundedIcon color="inherit"/>
        </div>
      );


    }

    return (

      <>
        <div onClick={() => {
         
          const customEvent = new CustomEvent('songClicked', { detail: { playlist: artistSongs, clickIndex: index } });
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
    songs.forEach((song) => { listOfSongIds.push(song._id) });
    return songs.map((song, index) => {
      return (
        <li className="tracklistRow" key={song._id}
          onClick={() => {

            const customEvent = new CustomEvent('songClicked', { detail: { playlist: listOfSongIds, clickIndex: index } });
            document.dispatchEvent(customEvent);


          }}
        >
          <div className="trackCount">
            {renderPlayingButtons(listOfSongIds, index, index + 1)}


          </div>
          <div className="trackInfo">
            <span className="trackName">{song.songTitle}</span>

            <span className="artistName">{artistName}</span>

          </div>
          <div className="trackDetails">
            <span className="trackPrice">{'$' + song.price}</span>
            <span className="duration">{song.duration}</span>


          </div>
        </li>
      );
    });
  };


  return (
    <ul className="tracklist">
      {renderSongs()}

    </ul>


  )

};

function mapStateToProps({ song }) {
  return { currentSongId: song.currentSongId };
}

export default connect(mapStateToProps, null)(SongsSection);

