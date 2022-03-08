import React from 'react';
import { connect } from 'react-redux'; 
import { BsShuffle } from 'react-icons/bs'; 
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
    <>

         <div id="nowPlayingBarContainer">
             <div id="nowPlayingBar">

                 <div id="nowPlayingLeft">

                 </div>

                 <div id="nowPlayingCenter">
                    <div className="content playerControls">
                        <div className="buttons">
                            <button className="controlButton shuffle" title="Shuffle Button">
                                <BsShuffle color="pink" size={30} alt="shuffle"/>
                            </button>
                        </div>

                    </div>

                 </div>

                 <div id="nowPlayingRight">

                 </div>

             </div>

         </div>
       

      
    </>
  );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);
