import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Setting from './components/Setting';
import Dataset from './components/Dataset';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './components/Profile';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Router>
      <div className="container-fluid ">
        <div className="row">
          <nav className="col-lg-2 bg-dark">
            <ul className="navbar-nav flex-column">
              {
                isAuthenticated ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/" style={{ color: "white" }}>Chat</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dataset" style={{ color: "white" }}>Datasets</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/setting" style={{ color: "white" }}>Setting</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile" style={{ color: "white" }}>Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout" style={{ color: "white" }}>Sign out</Link>
                    </li>
                  </> :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login" style={{ color: "white" }}>Login</Link>
                    </li>
                  </>
              }
            </ul>
          </nav>



          <div className="col-lg-10">
            <Routes>
              {
                isAuthenticated ?
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/dataset" element={<Dataset />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/logout' element={<Logout />} />
                  </>
                  : null
              }
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router >
  );
}

export default App;
