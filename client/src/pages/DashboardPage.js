import React from "react";

//import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import { Outlet } from "react-router-dom";

import "./DashboardPage.css";
import DashboardAppBar from "../components/Dashboard/DashboardAppBar/DashboardAppBar";
// import NavRoute from "../components/Dashboard/NavRoute/NavRoute";
import theme from "../components/Dashboard/theme";
import { ThemeProvider } from '@material-ui/core/styles';
import SwipeableNavBar from "../components/Dashboard/DashboardNav/SwipeableNav";
import { DashboardContextProvider } from "../components/Dashboard/DashboardContext";
import ResponsivePlayingBar from "../components/Dashboard/NowPlayingBar/ResponsivePlayingBar";
import BecomeArtistModal from "../components/Dashboard/BecomeArtist/BecomeArtistModal";

import { connect } from 'react-redux';

const DashboardPage = ({auth}) => {


  return (
    <ThemeProvider theme={theme}>
      <DashboardContextProvider>
        <DashboardAppBar />
        <SwipeableNavBar isArtist={auth && auth.isArtist} artistUsername={auth ? auth.artistUsername : ""}/>
        <div id="mainContainer">
          <div id="topContainer">
            <Outlet />
          </div>
          {/* <NowPlayingBar /> */}
          <ResponsivePlayingBar />
        </div>
        <BecomeArtistModal/>
       
      </DashboardContextProvider>
    </ThemeProvider>

  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(DashboardPage);
