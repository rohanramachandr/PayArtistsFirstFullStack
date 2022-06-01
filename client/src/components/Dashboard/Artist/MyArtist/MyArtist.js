import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { DashboardContext } from '../../DashboardContext'


import "../Artist.css";

const MyArtist = ({ fetchArtistInfo, fetchArtistSongs, fetchArtistAlbums, resetArtistPage, albums, info, songs, currentSongId }) => {

    const { artistUsername } = useParams();
    const { setUploadMusicOpen } = useContext(DashboardContext);


    useEffect(() => {
        fetchArtistInfo(artistUsername);
        fetchArtistAlbums(artistUsername);
        fetchArtistSongs(artistUsername);


        return () => {
            resetArtistPage();
        };
    }, [artistUsername, fetchArtistInfo, fetchArtistSongs, fetchArtistAlbums, resetArtistPage]);

   

   

    const renderArtistName = () => {
        return info ? <span>{info.artistName}</span> : null;
    };

   


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
        console.log("songs", songs);
        return songs.map((song, index) => {
            
            return (
                <li className="tracklistRow" key={song._id}>
                    <div className="trackCount">
                        {renderPlayingButtons(listOfSongIds, index, index + 1)}


                    </div>
                    <div className="trackInfo">
                        <span className="trackName">{song.songTitle}</span>
                        <span className="artistUsername">{renderArtistName()}</span>
                    </div>
                    <div className="trackOptions">
                        <div className="optionsIcon">
                            <MoreHorizRoundedIcon color="inherit"/>
                        </div>
                    </div>
                    <div className="trackDuration">
                        <span className="duration">{song.duration}</span>
                    </div>
                </li>
            );
        });
    };

    const playFirstSong = () => {
        if (songs.length > 0) {
            var listOfSongIds = [];
            songs.forEach((song) => { listOfSongIds.push(song._id) });
            const customEvent = new CustomEvent('songClicked', { detail: { playlist: listOfSongIds, clickIndex: 0 } });
            document.dispatchEvent(customEvent);
            
        }
    };



    const renderAlbums = () => {
   

        return albums.map(({ _id, albumTitle, artworkPath }) => {
          return (
            <Link to={`/album/${_id}`} key={_id} className="gridViewItem">
              <img src={artworkPath} alt={albumTitle} />
    
              <div className="gridViewInfo">{albumTitle}</div>
            </Link>
          );
        });
      };
    

    return (

        <div id="mainViewContainer">
            <div id="mainContent">
                <div className="entityInfo borderBottom">

                    <div className="centerSection">
                        <div className="artistInfo">
                            <h1 className="artistUsername">{renderArtistName()}</h1>

                            <div className="headerButtons">
                                <button className="button pink" onClick={() => setUploadMusicOpen(true)}>UPLOAD MUSIC</button>
                            </div>

                        </div>

                    </div>

                </div>
               
                <div className="trackListContainer borderBottom">
                    <h2>Songs</h2>
                    <ul className="tracklist"> {renderSongs()}</ul>
                </div>
                
                <div className="gridViewContainer">
                    <h2>Albums</h2>
                    {albums.length > 0 && renderAlbums()}
                
            </div>


            </div>



        </div>

    );

};

function mapStateToProps({ artist: { albums, info, songs }, song }) {
    return { albums, info, songs, currentSongId: song.currentSongId };
}


export default connect(mapStateToProps, actions)(MyArtist);