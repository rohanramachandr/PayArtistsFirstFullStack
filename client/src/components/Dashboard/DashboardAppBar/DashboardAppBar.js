import React from 'react';




import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core/';



import { Menu } from '@material-ui/icons/';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#000',
    color: '#fff'
    
  },
  title: {
    textAlign: 'left',
    width: 'calc(100% - 96px)'

    
  },
  input: {
    color: '#fff',
  },
  logout : {textDecoration: 'none', color: 'inherit'}
};



function DashboardAppBar(props) {


  const toggleSearch = () => {

      return (
        <>
          <IconButton
            color="inherit"
            aria-label="Menu"
            // onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </IconButton>
          
          <Typography variant="h6" color="inherit" style={styles.title}>
            PayArtistsFirst
          </Typography>
          
          
           
          <a href="/api/logout" style={styles.logout}><Button color="inherit">LOGOUT</Button></a> 
          
        </>
      );
    
  };

  return (

        <AppBar id="navbar" position="sticky" style={styles.root}>
          <Toolbar>{toggleSearch()}</Toolbar>
        </AppBar>

  );
}

export default DashboardAppBar;