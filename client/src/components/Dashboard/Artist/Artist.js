import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import SongsSection from "../Subcomponents/SongsSection";

import "./Artist.css";

const Artist = ({ fetchArtistInfo, fetchArtistSongs, fetchArtistAlbums, resetArtistPage, albums, info, songs, currentSongId }) => {

    const { artistUsername } = useParams();


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
              <img src={process.env.REACT_APP_ARTWORK_BUCKET_URL + artworkPath} alt={albumTitle} />
    
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
                                <button className="button pink" onClick={() => playFirstSong()}>PLAY</button>
                            </div>

                        </div>

                    </div>

                </div>
               
                <div className="trackListContainer borderBottom">
                    <h2>Songs</h2>
                    <SongsSection songs={songs} artistName={info?.artistName}/>
                </div>
                <h2 id="albumHeader">Albums</h2>
                <div className="gridViewContainer">
                    
                    {albums.length > 0 && renderAlbums()}
            </div>


            </div>



        </div>

    );

};

function mapStateToProps({ artist: { albums, info, songs } }) {
    return { albums, info, songs };
}


export default connect(mapStateToProps, actions)(Artist);