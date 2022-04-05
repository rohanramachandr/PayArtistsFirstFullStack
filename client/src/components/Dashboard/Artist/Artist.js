import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import { BsFillPlayFill, BsThreeDots, BsVolumeUpFill as Volume } from "react-icons/bs";

import "./Artist.css";

const Artist = ({ fetchArtistInfo, fetchArtistSongs, fetchArtistAlbums, resetArtistPage, setClickIndex, albums, info, songs, playlist, playlistIndex, setPlaylist }) => {

    const { artistName } = useParams();


    useEffect(() => {
        fetchArtistInfo(artistName);
        fetchArtistAlbums(artistName);
        fetchArtistSongs(artistName);


        return () => {
            resetArtistPage();
        };
    }, [artistName, fetchArtistInfo, fetchArtistSongs, fetchArtistAlbums, resetArtistPage]);

   

   

    const renderArtistName = () => {
        return info ? <span>{info.artistName}</span> : null;
    };

   

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);


    const renderPlayingButtons = (artistSongs, index, order) => {
    
        if (equals(artistSongs, playlist) && playlistIndex === index) {
            return (
                <div className="playingIcon">
                    <Volume color="#ec148c" size={20} alt="Volume" />
                </div>
            );


        }

        return (

            <>
                <div onClick={() => {
                    if (!equals(artistSongs, playlist)) {
                        
                        setPlaylist(artistSongs);
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
        songs.forEach((song) => { listOfSongIds.push(song._id) });
        return songs.map((song, index) => {
            return (
                <li className="tracklistRow" key={song._id}>
                    <div className="trackCount">
                        {renderPlayingButtons(listOfSongIds, index, index + 1)}


                    </div>
                    <div className="trackInfo">
                        <span className="trackName">{song.songTitle}</span>
                        <span className="artistName">{renderArtistName()}</span>
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

    const playFirstSong = () => {
        if (songs.length > 0) {
            var listOfSongIds = [];
            songs.forEach((song) => { listOfSongIds.push(song._id) });
            setPlaylist(listOfSongIds);
            setClickIndex(0);
        }
    };

    const renderAlbums = () => {
   

        return albums.map(({ _id, albumTitle, artworkPath }) => {
          return (
            <Link to={`/dashboard/album/${_id}`} key={_id} className="gridViewItem">
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
                            <h1 className="artistName">{renderArtistName()}</h1>

                            <div className="headerButtons">
                                <button className="button pink" onClick={() => playFirstSong()}>PLAY</button>
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
    return { albums, info, songs, playlist: song.playlist, playlistIndex: song.index };
}


export default connect(mapStateToProps, actions)(Artist);