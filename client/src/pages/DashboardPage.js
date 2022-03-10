import React from 'react';
import { connect } from 'react-redux';
import NowPlayingBar from '../components/Dashboard/NowPlayingBar';
import { BsSearch as Search } from 'react-icons/bs'; 
import './DashboardPage.css';


const Dashboard = (props) => {

    const renderContent = () => {
        switch (props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return 'You are logged out';
            default:
                return (
                    <a href="/api/logout">Log Out</a>
                );

        }

    };


    return (


        <div id="mainContainer">


            <div id="topContainer">

                <div id="navBarContainer">
                    <nav className="navBar">
                        <a href="/dashboard" className="logo">PayArtistsFirst</a>

                        <div className="group">

                            <div className="navItem">

                                <a href="/search" className="navItemLink">Search

                                    <Search id="searchIcon" size={20} alt="Shuffle" />
                                </a>

                            </div>

                        </div>

                        <div className="group">

                            <div className="navItem">

                                <a href="/browse" className="navItemLink">Browse</a>

                            </div>

                            <div className="navItem">

                                <a href="/yourmusic" className="navItemLink">Your Music</a>

                            </div>

                            <div className="navItem">

                                <a href="/profile" className="navItemLink">Rohan Ramachandran</a>

                            </div>

                            <div className="navItem">

                                <a href="/api/logout" className="navItemLink">Log Out</a>

                            </div>

                        </div>

                    </nav>


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
