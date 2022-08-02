import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAlbums } from "../../../actions";
import { Link } from "react-router-dom";
import "./Browse.css";

const Browse = (props) => {


  const { fetchAlbums } = props;

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  

  const renderAlbums = () => {
   

    return props.albums.map(({ _id, albumTitle, artworkPath }) => {
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
            <h1 className="pageHeadingBig">Trending Now</h1>
            <div className="gridViewContainer">
              {props.albums.length > 0 && renderAlbums()}
            </div>
          </div>
        </div>
      
  );
};

function mapStateToProps({ albums }) {
  return { albums };
}

export default connect(mapStateToProps, { fetchAlbums })(Browse);
