import logo from "./logo.svg";

// import ReactDOM from "react-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Main } from "./components/Main/Main";
import Button from "react-bootstrap/Button";
import ReactDOM from "react-dom";
import { mainPage } from "../src/components/functions/functions";
import { Header } from "../src/components/Header/Header";
import { back } from "../src/components/functions/functions";
import React, { useState, useEffect } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import { Profile } from "./components/profile/Profile";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function App() {
  const [page, setPage] = useState(0);
  const [loggedUser, setLoggedUser] = useState(undefined);

  const storeUser = (loggedUser) => setLoggedUser(loggedUser);

  const isLoggedIn = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/isloggedin`;

  useEffect(() => {
    console.log("loggedUser", loggedUser);
    isLoggedIn.post(baseURL, { loggedUser }).then((theLoggedUser) => {
      storeUser(theLoggedUser.data).catch(() => this.storeUser(undefined));
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          {/* <p>Match Maker</p> */}
          <Header
            back={(e) => {
              setPage(back(page));
            }}
            page={page}
            setPage={setPage}
            matchMakerTitle={(e) => {
              setPage(mainPage(page));
            }}
            storeUser={storeUser}
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
          />

          <Switch>
            <Route path="/" exact>
              <Main page={page} setPage={setPage} />
            </Route>
            <Route path="/profile/:id" exact>
              <Profile loggedUser={loggedUser} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
