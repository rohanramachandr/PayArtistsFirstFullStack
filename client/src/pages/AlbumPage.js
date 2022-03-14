import { useParams } from "react-router-dom";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import './AlbumPage.css';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { useEffect } from "react";

const AlbumPage = ({album, fetchAlbum, fetchAlbumGenre, fetchAlbumArtist, fetchAlbumSongs}) => {

    const { albumId } = useParams();

    useEffect(() => {
        fetchAlbum(albumId);
        fetchAlbumGenre(albumId);
        fetchAlbumArtist(albumId);
        fetchAlbumSongs(albumId);

    }, []);


    return (

        <div id="mainContainer">


        <div id="topContainer">
            <DashboardNav />

            <div id="mainViewContainer">
                <div id="mainContent">

                    <h1 className="pageHeadingBig">Album Page For id {albumId}</h1>
                    {/* <div className="gridViewContainer">
                        {props.albums.length > 0 && renderAlbums()}

                    </div> */}
                    {console.log(album)}
                    

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

export default connect(mapStateToProps, actions )(AlbumPage);
