import React from 'react';
import { withRouter } from 'react-router-dom';




import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
} from '@material-ui/core/';



import { Menu, Search } from '@material-ui/icons/';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#000',
    color: '#fff'
  },
  title: {
    textAlign: 'center',
    width: 'calc(100% - 96px)',
    fontFamily: 'Encode Sans Expanded'
  },
  input: {
    color: '#fff',
  },
};

// function HideOnScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger();

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

function DashboardAppBar(props) {
//   const [{ searchState }, dispatch] = useContext(GlobalContext);

//   const setMenuOpen = (data) => {
//     // console.log(data);
//     dispatch({ type: 'setMenuOpen', snippet: data });
//   };
//   const setSearchState = React.useCallback(
//     (data) => {
//       // console.log(data);
//       dispatch({ type: 'setSearchState', snippet: data });
//     },
//     [dispatch]
//   );

//   React.useEffect(() => {
//     // if the page is on search we will change the search state
//     const changeAppBar = () => {
//       const path = props.history.location.pathname;
//       if (path === '/search') {
//         setSearchState('searching');
//       } else {
//         setSearchState('home');
//       }
//       // console.log("history change detected in app bar");
//     };

//     changeAppBar();
//     const unlisten = props.history.listen((location) => {
//       changeAppBar();
//     });
//   }, [setSearchState, props.history]);

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
          <IconButton
            // onClick={() => setSearchState('clicked')}
            color="inherit"
            aria-label="Search"
          >
            <Search />
          </IconButton>
        </>
      );
    
  };

  return (
    <>
      {/* <HideOnScroll {...props}> */}
        <AppBar id="navbar" position="sticky" style={styles.root}>
          <Toolbar>{toggleSearch()}</Toolbar>
        </AppBar>
      {/* </HideOnScroll> */}
    </>
  );
}

export default DashboardAppBar;