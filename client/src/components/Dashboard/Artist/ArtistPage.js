import React, { useContext } from "react";
import {  useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import Artist from "./Artist";
import MyArtist from "./MyArtist/MyArtist";
import { DashboardContext } from "../DashboardContext";

const ArtistPage = ({auth}) => {

  
    const { userArtistUsername} = useContext(DashboardContext);
    

    const location = useLocation();
   

    const returnArtistPage = () => {
        if (auth && auth.isArtist && userArtistUsername === location.pathname.replace("/", "")){
            return <MyArtist />
        }

        return <Artist />
    }

    return returnArtistPage();

  
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(ArtistPage);