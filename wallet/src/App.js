import React from "react";
import './App.css';
import {
  Router
} from "react-chrome-extension-router";
import {Login} from "./pages/Login";

function App() {
  return (
    <>
     <Router>
        <Login/>
     </Router>
    </>
  );
}

export default App;
