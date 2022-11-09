import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import * as actions from "../../../../actions";
import { connect } from "react-redux";
import SongsSection from "../../Subcomponents/SongsSection";
import { DashboardContext } from '../../DashboardContext'


import "../Artist.css";
import UploadMusicModal from "./UploadMusicModal";

const MyArtist = ({ fetchArtistInfo, fetchArtistSongs, fetchArtistAlbums, resetArtistPage, albums, info, songs, currentSongId, artistId }) => {

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

    useEffect(() => {
        console.log("artistInfo", info)
    }, [info])





    const renderArtistName = () => {
        return info ? <span>{info.artistName}</span> : null;
    };






    // const playFirstSong = () => {
    //     if (songs.length > 0) {
    //         var listOfSongIds = [];
    //         songs.forEach((song) => { listOfSongIds.push(song._id) });
    //         const customEvent = new CustomEvent('songClicked', { detail: { playlist: listOfSongIds, clickIndex: 0 } });
    //         document.dispatchEvent(customEvent);

    //     }
    // };



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
        <>
            {info ? <UploadMusicModal artistName={info.artistName} artistUsername={info.artistUsername} artistId={info._id} /> : null}
            <div id="mainViewContainer">
                <div id="mainContent">
                    <div className="entityInfo borderBottom">

                        <div className="centerSection">
                            <div className="artistInfo">
                                <h1 className="artistUsername">{renderArtistName()}</h1>

                                <div className="headerButtons">
                                    {info ? <button className="button pink" onClick={() => setUploadMusicOpen(true)}>UPLOAD MUSIC</button> : null}
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="trackListContainer borderBottom">
                        <h2>Songs</h2>
                        <SongsSection songs={songs} artistName={info?.artistName} />
                    </div>
                    <h2 id="albumHeader">Albums</h2>
                    <div className="gridViewContainer">

                        {albums.length > 0 && renderAlbums()}

                    </div>


                </div>



            </div>

        </>

    );

};

function mapStateToProps({ artist: { albums, info, songs } }) {
    return { albums, info, songs };
}


export default connect(mapStateToProps, actions)(MyArtist);