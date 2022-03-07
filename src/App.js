import logo from "./logo.svg";
// import ReactDOM from "react-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Main } from "./components/Main/Main";
import Button from "react-bootstrap/Button";
import ReactDOM from "react-dom";
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <p>Match Maker</p> */}
          <Main />
        </header>
      </div>
    </Router>
  );
}

export default App;
