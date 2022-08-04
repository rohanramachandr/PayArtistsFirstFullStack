import React, {useContext, useEffect} from 'react';
import { DashboardContext } from '../DashboardContext';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core/';



import { Menu, Search } from '@material-ui/icons/';

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



function DashboardAppBar() {

 
  const location = useLocation();
  const {setMenuOpen, searchState} = useContext(DashboardContext);



  const toggleSearch = () => {

    if (searchState.state === 'closed') {

      return (
        <>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </IconButton>
          
          <Typography variant="h6" color="inherit" style={styles.title}>
            ReleaseRadar
          </Typography>

          {/* <a href="/api/logout" style={styles.logout}><Button color="inherit">LOGOUT</Button></a>  */}
          
          <Link
            to="/search" state={{ prevPath: location.pathname }}
            style={{color: "#fff"}}
          >
            <Search color="inherit"/>
          </Link>
           
         
          
        </>
      );


    }


    return <SearchBox prevPath={searchState.prevPath}/>;

    
    
  };

  return (

        <AppBar id="navbar" position="sticky" style={styles.root}>
          <Toolbar>{toggleSearch()}</Toolbar>
        </AppBar>

  );
}

export default DashboardAppBar;