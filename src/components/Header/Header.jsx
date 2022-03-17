import React, { useState } from "react";
import "./Header.css";
import icon from "./icon.png";
import iconVector from "./iconVector.svg";
import Dropdown from "react-bootstrap/Dropdown";
import * as ReactBootstrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

export function Header(props) {
  const [userMenu, setUserMenu] = useState(false);
  const [modalOpenLogin, setModalOpenLogin] = useState(false);
  const [modalOpenSignIn, setModalOpenSignIn] = useState(false);
  const [modalOpenSignUp, setModalOpenSignUp] = useState(false);
  const [loggedUserName, setLoggedUserName] = useState(undefined);

  const unfoldMenu = () => {
    if (userMenu) {
      setUserMenu(false);
    } else {
      setUserMenu(true);
    }
  };

  return (
    <>
      <div className="superHeader">
        <div className="header">
          <div className="subheader">
            <div onClick={props.back}>Back</div>
            <Link to="/">
              <div onClick={props.matchMakerTitle}>Match Creator</div>
            </Link>
            <div className="menuUser">
              {/* <p>User</p>{" "} */}
              <div className="vector">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
                </svg>
                <img
                  src={iconVector}
                  alt="User"
                  className="UserIcon"
                  onClick={unfoldMenu}
                ></img>
              </div>
              <div className="userName">
                {props.loggedUser ? <p> {loggedUserName}</p> : null}
              </div>
            </div>
          </div>
        </div>
        {userMenu ? (
          <div className="unfoldedMenu">
            <ul>
              {!props.loggedUser && <hr />}
              {!props.loggedUser ? (
                <li
                  className="openModalBtn"
                  onClick={() => {
                    setModalOpenLogin(true);
                  }}
                >
                  Login
                </li>
              ) : null}

              {!props.loggedUser && <hr />}

              {!props.loggedUser ? (
                <li
                  onClick={() => {
                    setModalOpenSignUp(true);
                  }}
                >
                  Sign Up
                </li>
              ) : null}

              {/* poner aqui que si esta logeado un <Link> al perfil de usuario y que no salga login ni signup */}

              {props.loggedUser && <hr />}

              {props.loggedUser ? (
                <Link to="/profile">
                  <li>Profile</li>
                </Link>
              ) : null}
              <hr />
              {props.loggedUser ? (
                <li
                  onClick={(e) => {
                    props.storeUser(undefined);
                  }}
                >
                  Logout
                </li>
              ) : null}
            </ul>{" "}
          </div>
        ) : null}

        {modalOpenLogin ? (
          <Modal
            modalOpenLogin={modalOpenLogin}
            setModalOpenLogin={setModalOpenLogin}
            setModalOpenSignUp={setModalOpenSignUp}
            setModalOpenLogin={setModalOpenLogin}
            storeUser={props.storeUser}
            setLoggedUserName={setLoggedUserName}
          >
            {" "}
            <Login></Login>
          </Modal>
        ) : null}
        {modalOpenSignIn ? (
          <Modal
            setModalOpenLogin={setModalOpenLogin}
            setModalOpenSignUp={setModalOpenSignUp}
          />
        ) : null}
        {modalOpenSignUp ? (
          <Modal
            modalOpenSignUp={modalOpenSignUp}
            setModalOpenLogin={setModalOpenLogin}
            setModalOpenSignUp={setModalOpenSignUp}
          />
        ) : null}
      </div>
    </>
  );
}
