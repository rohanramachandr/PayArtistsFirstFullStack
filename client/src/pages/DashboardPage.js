import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../actions';
import NowPlayingBar from '../components/Dashboard/NowPlayingBar/NowPlayingBar';
import DashboardNav from '../components/Dashboard/DashboardNav/DashboardNav';
import './DashboardPage.css';





const Dashboard = (props) => {

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
        console.log("inside render albums", props.albums);
      
   
            return props.albums.map(({_id, albumTitle, artworkPath}) => {    
         
                return (
                    <div key={_id} className="gridViewItem">
                        <img src={artworkPath} alt={albumTitle}/>

                        <div className="gridViewInfo">
                            {albumTitle}

                        </div>

                    </div>

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

export default connect(mapStateToProps, {fetchAlbums})(Dashboard);
