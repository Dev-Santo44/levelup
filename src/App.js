import React from 'react';
import './App.css';

import Home from './componets/Home';
import Navbar from './componets/Navbar';
import SignIn from './componets/Login';
import Profile from './componets/Profile';
import Courses from './componets/Cources';
import Learning from './componets/Learning';
import CourseDetailPage from './componets/CourseDetailPage';
// user 
import { auth } from "./services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);





  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={user?<Profile/>:<SignIn />} />
            <Route path="/cources" element={user?<Courses/>:<SignIn />} />
            <Route path="/learning" element={user?<Learning/>:<SignIn />} />
            <Route path="/courses/:id" element={user?<CourseDetailPage />:<SignIn />} />
          </Routes>
        </Router>

      </header>
    </div>
  );
}

export default App;
