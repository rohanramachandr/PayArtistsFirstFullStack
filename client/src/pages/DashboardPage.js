import React from "react";

import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import { Outlet } from "react-router-dom";

import "./DashboardPage.css";
import DashboardAppBar from "../components/Dashboard/DashboardAppBar/DashboardAppBar";
// import NavRoute from "../components/Dashboard/NavRoute/NavRoute";
import theme from "../components/Dashboard/theme";
import { ThemeProvider } from "@material-ui/core";

const DashboardPage = (props) => {






  return (
    <ThemeProvider theme={theme}>
      <DashboardAppBar />
      <div id="mainContainer">
        <div id="topContainer">
          <DashboardNav />
          <Outlet />


        </div>

        <NowPlayingBar />
      </div>
    </ThemeProvider>

  );
};


export default DashboardPage;
