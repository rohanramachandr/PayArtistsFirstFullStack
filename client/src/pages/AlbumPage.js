import { useParams } from "react-router-dom";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import './AlbumPage.css';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { useEffect } from "react";
import { BsFillPlayFill, BsThreeDots } from 'react-icons/bs'
const AlbumPage = ({ album, fetchAlbum, fetchAlbumGenre, fetchAlbumArtist, fetchAlbumSongs }) => {

    const { albumId } = useParams();

    useEffect(() => {
        fetchAlbum(albumId);
        fetchAlbumGenre(albumId);
        fetchAlbumArtist(albumId);
        fetchAlbumSongs(albumId);

    }, [albumId, fetchAlbum, fetchAlbumGenre, fetchAlbumArtist, fetchAlbumSongs]);

    const renderArtwork = () => {
        return album.album ? <img src={album.album.artworkPath} alt="album art"/> : null;
    };

    const renderAlbumTitle = () => {
        return album.album ? <h2>{album.album.albumTitle}</h2> : null;
    };

    const renderArtistName = () => {
        return album.artist ? <span>{`By ${album.artist}`}</span> : null;
    };

    const renderNumSongs = () => {
        return album.songs ? <span>{`${album.songs.length} songs`}</span> : null;
    }

    const renderSongs = () => {//TODO perhaps change to get artist name from song instead of album
        return album.songs.map((song) => {
            return (
                <li className="tracklistRow" key={song._id} >
                    <div className="trackCount">
                        <div className="playIcon">
                           <BsFillPlayFill size={20}/> 
                        </div>
                        
                        <span className="trackNumber">{song.albumOrder}</span>
                    </div>
                    <div className="trackInfo">
                        <span className="trackName">{song.songTitle}</span>
                        <span className="artistName">{album.artist}</span>


                    </div>
                    <div className='trackOptions'>
                            <div className="optionsIcon">
                                <BsThreeDots size={20}/>
                            </div>
                            
                    </div>
                    <div className="trackDuration"> 
                        <span className="duration">{song.duration}</span>

                    </div>


                    
                </li>
            );

        }
        );
    }



    return (

        <div id="mainContainer">


            <div id="topContainer">
                <DashboardNav />

                <div id="mainViewContainer">
                    <div id="mainContent">

                        <div className="entityInfo">
                            <div className="leftSection">
                                {renderArtwork()}

                            </div>
                            <div className="rightSection">
                                {renderAlbumTitle()}
                                <p>{renderArtistName()}</p>
                                <p>{renderNumSongs()}</p>

                            </div>

                        </div>

                        <div className="trackListContainer">
                            <ul className="tracklist">
                                {renderSongs()}
                            </ul>

                        </div>


                    </div>


                </div>


            </div>

            <NowPlayingBar />


        </div>


    );
};

function mapStateToProps({ album }) {
    return { album };
}

export default connect(mapStateToProps, actions)(AlbumPage);
