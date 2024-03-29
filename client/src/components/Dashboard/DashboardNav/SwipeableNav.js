import React, { useContext, useEffect } from "react";
import axios from 'axios';
import { DashboardContext } from "../DashboardContext";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { connect } from 'react-redux';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import AlbumIcon from '@mui/icons-material/Album';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';





const SwipeableNavBar = ({ isArtist}) => {

    const { menuOpen, setMenuOpen, setBecomeArtistOpen, userArtistUsername, setUserArtistUsername } = useContext(DashboardContext);
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

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
        },
        divider: {
            border: '1px solid #fff',
            margin: "10px 15px"

        },
        logo: {
            color: "#fff"
        },
        link: { textDecoration: 'none', color: 'inherit' }

    };

    useEffect(() => {

        const fetchUserArtistUsername = async () => {

            const res = await axios.get('/api/current_artist');

            setUserArtistUsername(res.data);

        };


        fetchUserArtistUsername();

    }, [setUserArtistUsername]);


   


    const renderMyMusicOrBecomeArtist = () => {

        if (!isArtist) {

            return (
                <ListItem button key="Become An Artist" onClick={() => setBecomeArtistOpen(true)}>
                    <ListItemIcon>
                        <AlbumIcon fontSize="large" style={styles.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Become An Artist" />
                </ListItem>
            );
        }


        return (
            <>
                {userArtistUsername !== "" && userArtistUsername !== undefined && <Link to={`/${userArtistUsername}`} style={styles.link}>
                <ListItem button key="My Music">
                    <ListItemIcon>
                        <AlbumIcon fontSize="large" style={styles.icon} />
                    </ListItemIcon>
                    <ListItemText primary="My Music" />
                </ListItem>

            </Link>}
            </>
        
        );

    };



    return (



        <SwipeableDrawer

            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onOpen={() => setMenuOpen(true)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}

        >

            <Box
                style={styles.drawer}
                onClick={() => setMenuOpen(false)}


            >

                <List>
                    <Link to="/" style={styles.link}>
                        <ListItem button key="Logo">
                            <Typography style={styles.logo} variant="h5" component="div">
                                ReleaseRadar
                            </Typography>

                        </ListItem>

                    </Link>
                    <Divider variant="middle" style={styles.divider} />
                    <Link to="/browse" style={styles.link}>
                        <ListItem button key="Browse">
                            <ListItemIcon>
                                <MusicNoteIcon fontSize="large" style={styles.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Browse" />
                        </ListItem>
                    </Link>

                    {renderMyMusicOrBecomeArtist()}

                    <ListItem button key="MyBalance">
                        <ListItemIcon>
                            <AttachMoneyIcon fontSize="large" style={styles.icon} />
                        </ListItemIcon>
                        <ListItemText primary="My Balance" />
                    </ListItem>
                    <ListItem button key="Settings">
                        <ListItemIcon>
                            <SettingsIcon fontSize="large" style={styles.icon} />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <Divider variant="middle" style={styles.divider} />
                    <a href="/api/logout" style={styles.link}>
                        <ListItem button key="Logout">
                            <ListItemIcon>
                                <LogoutIcon fontSize="large" style={styles.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </a>
                </List>

            </Box>

        </SwipeableDrawer>





    );

};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, null)(SwipeableNavBar);
