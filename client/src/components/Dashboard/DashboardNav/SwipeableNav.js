import React, { useState } from "react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { Link } from 'react-router-dom';
import AlbumIcon from '@mui/icons-material/Album';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import "./DashboardNav.css";


const SwipeableNavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const styles = {
        drawer: {
            width: 250,
            height: '100%',
            // background: '#181818'
            background: '#181818',
            borderRight: '1px solid #fff',
            color: '#ec148c'


        },
        icon: {
            color: "#ec148c"
        }

    };



    return (

        <>
            <Button onClick={() => setMenuOpen(true)}>Left</Button>
            <SwipeableDrawer

                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onOpen={() => setMenuOpen(true)}


            >

                <Box
                    style={styles.drawer}
                >


                    <List>

                        <ListItem button key="Browse">
                            <ListItemIcon>
                                <MusicNoteIcon fontSize="large" style={styles.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Browse" />
                        </ListItem>
                        <ListItem button key="Become An Artist">
                            <ListItemIcon>
                                <AlbumIcon fontSize="large" style={styles.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Become An Artist" />
                        </ListItem>
                        <ListItem button key="Settings">
                            <ListItemIcon>
                                <SettingsIcon fontSize="large" style={styles.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                       

                    </List>
                    <Divider style={styles.icon}/>
                    <List>
                    <ListItem button key="Logout">
                            <ListItemIcon>
                                <LogoutIcon fontSize="large" style={styles.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>

                    </List>
                    {/* <a href="/dashboard" className="logo">PayArtistsFirst</a>

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

                </div> */}
                </Box>

            </SwipeableDrawer>

        </>




    );

};

export default SwipeableNavBar;