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


    return (


        <div id="mainContainer">


            <div id="topContainer">
                <DashboardNav />
            

            </div>

            <NowPlayingBar />


        </div>








    );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);
