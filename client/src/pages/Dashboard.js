import React from 'react';
import { connect } from 'react-redux'; 

const Dashboard = (props) => {

    console.log(props);
  return (
    <div>

        <h1>Welcome To The Dashboard</h1>
      
    </div>
  );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);
