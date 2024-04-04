import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Setting from './components/Setting';
import Dataset from './components/Dataset';
// import Login from './components/Auth/Login';
// import Logout from './components/Auth/Logout';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

import { useAuth0 } from "@auth0/auth0-react";


function App() {

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // console.log("before", isLoading);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  // console.log("after", isLoading);


  return (
    <div>
      {
        isAuthenticated ?
          <>
            <Router>
              <div className="container-fluid ">
                <div className="row">
                  <nav className="col-lg-2 bg-dark">
                    <ul className="navbar-nav flex-column">
                      <Sidebar />

                    </ul>
                  </nav>

                  <div className="col-lg-10">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/dataset" element={<Dataset />} />
                      <Route path="/setting" element={<Setting />} />
                      <Route path='/profile' element={<Profile />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </Router >
          </>
          : null
      }
    </div>
  );
}

export default App;
