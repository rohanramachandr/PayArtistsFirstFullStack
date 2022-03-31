import React from "react";

import NowPlayingBar from "../components/Dashboard/NowPlayingBar/NowPlayingBar";
import DashboardNav from "../components/Dashboard/DashboardNav/DashboardNav";
import {Outlet} from "react-router-dom";

import "./DashboardPage.css";
// import NavRoute from "../components/Dashboard/NavRoute/NavRoute";

const DashboardPage = (props) => {
  





  return (
    <div id="mainContainer">
      <div id="topContainer">
        <DashboardNav />
        <Outlet />
        
        
      </div>

      <NowPlayingBar />
    </div>
  );
};


export default DashboardPage;
