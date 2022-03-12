import React from 'react';
import { connect } from 'react-redux';
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
    console.log("user", props.auth);


    return (


        <div id="mainContainer">


            <div id="topContainer">
                <DashboardNav />

                <div id="mainViewContainer">
                    <div id="mainContent">

                        <h1 className="pageHeadingBig">You Might Also Like</h1>
                        <div className="gridViewContainer">

                        </div>

                    </div>


                </div>
            

            </div>

            <NowPlayingBar />


        </div>








    );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);
