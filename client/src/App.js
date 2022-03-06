import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Home from './pages/Home';
import SignInPage from './pages/Signin';
import Dashboard from './pages/Dashboard';


class App extends Component {

  componentDidMount() {
    this.props.fetchUser();

  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignInPage />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
        </Routes>

      </Router>
    );

  }
}

export default connect(null, actions)(App);
