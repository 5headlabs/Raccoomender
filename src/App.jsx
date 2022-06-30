import "./App.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import React, { useEffect, useState } from "react";

import Frontpage from "./components/Frontpage";
import Login from "./components/Login";
import Register from "./components/Register";
import TutorialCreation from "./components/Tutorial_Creation";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect (() => {
    if(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Frontpage loggedIn={loggedIn}/>}/>
              {!loggedIn ? (<Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>) : null} 
              {!loggedIn ? (<Route path="/register" element={<Register setLoggedIn={setLoggedIn}/>}/>) : null }
              {!loggedIn ? (<Route path="/create" element={<TutorialCreation/>}/>) : null }
              <Route path="/*" element={<Navigate to="/" replace={true} />}/>
            </Routes> 
          </BrowserRouter>
        </header>
      </div>
    </>
  );
}

export default App;
