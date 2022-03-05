import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/Signin';
import Dashboard from './pages/Dashboard';


function App() {
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

export default App;
