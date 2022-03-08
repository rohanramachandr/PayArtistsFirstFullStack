import React from 'react';
import { connect } from 'react-redux'; 

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
    <div>

        <h1>Welcome  To The Dashboard {props.auth ? props.auth.name : ""}</h1>
        <ul>{renderContent()}</ul>

      
    </div>
  );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);
