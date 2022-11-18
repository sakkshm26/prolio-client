import React from "react";
import logo from "./logo.svg";
import "./App.css";
import YoutubeAuth from "./components/YoutubeAuth/YoutubeAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TwitterAuth from "./components/TwitterAuth/TwitterAuth";
import { Login, Signup } from "./components/Registration";
import { Navbar } from "./components/Navbar";
import Profile from "./components/Profile";
import { PrivateRoute } from "./route";
import { About, Default, Home, UserDashboard } from "./pages";

function App() {
  return (
    <div className="App" style={{ background: "linear-gradient(rgb(26 2 2), rgb(4 2 27))", minHeight: "100vh" }}>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/:username"
          element={
            // <PrivateRoute>
              //  <Navbar /> 
              <Profile />
            // </PrivateRoute>
          }
        />
        {/* <Route 
          path="/about"
          element={
            <About />
          }
        /> */}
        {/* <Route path="/youtube" element={<YoutubeAuth />} />
        <Route path="/twitter" element={<TwitterAuth />} /> */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<Default />} />
      </Routes>
    </div>
  );
}

export default App;
