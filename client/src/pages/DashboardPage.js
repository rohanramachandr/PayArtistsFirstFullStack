import React from "react";

import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import { Outlet } from "react-router-dom";

import "./DashboardPage.css";
import DashboardAppBar from "../components/Dashboard/DashboardAppBar/DashboardAppBar";
// import NavRoute from "../components/Dashboard/NavRoute/NavRoute";
import theme from "../components/Dashboard/theme";
import { ThemeProvider } from "@material-ui/core";
import SwipeableNavBar from "../components/Dashboard/DashboardNav/SwipeableNav";
import { DashboardContextProvider } from "../components/Dashboard/DashboardContext";
import ResponsivePlayingBar from "../components/Dashboard/NowPlayingBar/ResponsivePlayingBar";

const DashboardPage = (props) => {


  return (
    <ThemeProvider theme={theme}>
      <DashboardContextProvider>
        <DashboardAppBar />
        <SwipeableNavBar />
        <div id="mainContainer">
          <div id="topContainer">
            <Outlet />
          </div>
          {/* <NowPlayingBar /> */}
          <ResponsivePlayingBar />
        </div>
      </DashboardContextProvider>
    </ThemeProvider>

  );
};


export default DashboardPage;
