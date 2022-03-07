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

export function Header(props) {
  const [userMenu, setUserMenu] = useState(false);
  const [modalOpenLogin, setModalOpenLogin] = useState(false);
  const [modalOpenSignIn, setModalOpenSignIn] = useState(false);
  const [modalOpenSignUp, setModalOpenSignUp] = useState(false);

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
            <div onClick={props.matchMakerTitle}>Match Creator</div>
            <div>
              {/* <p>User</p>{" "} */}
              <div className="vector">
                <img
                  src={iconVector}
                  alt="User"
                  className="UserIcon"
                  onClick={unfoldMenu}
                ></img>
              </div>
            </div>
          </div>
        </div>
        {userMenu ? (
          <div className="unfoldedMenu">
            <ul>
              <hr />
              <li
                className="openModalBtn"
                onClick={() => {
                  setModalOpenLogin(true);
                }}
              >
                Login
              </li>

              <hr />

              <li
                onClick={() => {
                  setModalOpenSignUp(true);
                }}
              >
                Sign Up
              </li>
              <hr />

              <li>Logout</li>
            </ul>{" "}
          </div>
        ) : null}

        {modalOpenLogin ? (
          <Modal
            modalOpenLogin={modalOpenLogin}
            setModalOpenLogin={setModalOpenLogin}
            setModalOpenSignIn={setModalOpenSignIn}
            setModalOpenSignUp={setModalOpenSignUp}
          >
            {" "}
            <Login></Login>
          </Modal>
        ) : null}
        {modalOpenSignIn ? (
          <Modal
            setModalOpenLogin={setModalOpenLogin}
            setModalOpenSignIn={setModalOpenSignIn}
            setModalOpenSignUp={setModalOpenSignUp}
          />
        ) : null}
        {modalOpenSignUp ? (
          <Modal
            modalOpenSignUp={modalOpenSignUp}
            setModalOpenLogin={setModalOpenLogin}
            setModalOpenSignIn={setModalOpenSignIn}
            setModalOpenSignUp={setModalOpenSignUp}
          />
        ) : null}
      </div>
    </>
  );
}
