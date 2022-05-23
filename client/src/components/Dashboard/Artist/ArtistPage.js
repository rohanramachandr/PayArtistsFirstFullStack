import React from "react";
import {  useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import Artist from "./Artist";
import MyArtist from "./MyArtist";

const ArtistPage = ({auth}) => {

  
    

    const location = useLocation();
   

    const returnArtistPage = () => {
        if (auth && auth.isArtist && auth.artistUsername === location.pathname.replace("/", "")){
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