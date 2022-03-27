import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAlbums } from "../actions";
import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import { Link } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = (props) => {
  // const renderContent = () => {
  //     switch (props.auth) {
  //         case null:
  //             return 'Still deciding';
  //         case false:
  //             return 'You are logged out';
  //         default:
  //             return (
  //                 <a href="/api/logout">Log Out</a>
  //             );

  //     }

  // };

  const { fetchAlbums } = props;

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const renderAlbums = () => {
   

    return props.albums.map(({ _id, albumTitle, artworkPath }) => {
      return (
        <Link to={`/album/${_id}`} key={_id} className="gridViewItem">
          <img src={artworkPath} alt={albumTitle} />

          <div className="gridViewInfo">{albumTitle}</div>
        </Link>
      );
    });
  };

  return (
    <div id="mainContainer">
      <div id="topContainer">
        <DashboardNav />

        <div id="mainViewContainer">
          <div id="mainContent">
            <h1 className="pageHeadingBig">You Might Also Like</h1>
            <div className="gridViewContainer">
              {props.albums.length > 0 && renderAlbums()}
            </div>
          </div>
        </div>
      </div>

      <NowPlayingBar />
    </div>
  );
};

function mapStateToProps({ auth, albums }) {
  return { auth, albums };
}

export default connect(mapStateToProps, { fetchAlbums })(DashboardPage);
