import logo from "./logo.svg";
// import ReactDOM from "react-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Main } from "./components/Main/Main";
import Button from "react-bootstrap/Button";
import ReactDOM from "react-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Match Maker</p> */}
        <Main />
      </header>
    </div>
  );
}

export default App;
