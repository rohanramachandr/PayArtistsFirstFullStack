import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Home from './pages/HomePage';
import SignInPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';
import Album from './components/Dashboard/Album/Album';
import Browse from './components/Dashboard/Browse/Browse';
// import AlbumPage from './pages/AlbumPage';
import RootGaurd from './guards/RootGuard';
import Artist from './components/Dashboard/Artist/Artist';



class App extends Component {
 



  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserArtistUsername();
  
  }

  render() {
    return (
      <Router>
        <RootGaurd>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="" element={<DashboardPage />}>
              <Route path="browse" element={<Browse />} />
              <Route path="album/:albumId" element={<Album />} />
              <Route path=":artistUsername" element={<Artist />} />


            </Route>



          </Routes>
        </RootGaurd>
      </Router>
    );

  }
}



export default connect(null, actions)(App);
