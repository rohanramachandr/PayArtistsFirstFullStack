import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Home from './pages/HomePage';
import SignInPage from './pages/SigninPage';
import Dashboard from './pages/DashboardPage';
import RootGaurd from './guards/RootGuard';


class App extends Component {

  componentDidMount() {
    this.props.fetchUser();

  }

  render() {
    return (
      <Router>
        <RootGaurd>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SignInPage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </RootGaurd>
      </Router>
    );

  }
}

export default connect(null, actions)(App);
