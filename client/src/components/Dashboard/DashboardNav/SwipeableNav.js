import React, { useState } from "react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { Box } from "@material-ui/core";
import { Link } from 'react-router-dom';
import "./DashboardNav.css";


const SwipeableNavBar = () => {

    const [menuOpen, setMenuOpen ] = useState(true);

    const styles ={
        drawer: {
            width: 250, 
            height: '100%',
            background: '#181818'
        }
    };



    return (


        <SwipeableDrawer
          
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onOpen={() => setMenuOpen(true)}


        >

            <Box 
                style={styles.drawer}
            >
                <a href="/dashboard" className="logo">PayArtistsFirst</a>

                <div className="group">

                    <div className="navItem">

                        <a href="/search" className="navItemLink">Search

                            Search
                        </a>

                    </div>

                </div>

                <div className="group">

                    <div className="navItem">

                        <Link to="/dashboard/browse" className="navItemLink">Browse</Link>

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
            </Box>

        </SwipeableDrawer>




    );

};

export default SwipeableNavBar;