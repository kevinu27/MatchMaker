import React from "react";
import Login from "../Login/Login";
// import Signup from "../Signup/Signup";
import Signup from "../Signup/Signup";
import "./Modal.css";

function Modal({
  modalOpenLogin,
  modalOpenSignUp,
  setModalOpenLogin,
  setModalOpenSignUp,
  storeUser,
  setLoggedUserName,
}) {
  return (
    <div
      className="modalBackground"
      onClick={(e) => {
        e.stopPropagation();
        setModalOpenLogin(false);

        setModalOpenSignUp(false);
      }}
    >
      <div
        className="modalContainer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpenLogin(false);

              setModalOpenSignUp(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          {modalOpenSignUp === true && (
            <Signup setModalOpenSignUp={setModalOpenSignUp} />
          )}
          {modalOpenLogin === true && (
            <Login
              setModalOpenLogin={setModalOpenLogin}
              storeUser={storeUser}
              setLoggedUserName={setLoggedUserName}
            />
          )}

          {/*   <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>*/}
        </div>
        <div className="footer">
          {/* <button
            onClick={() => {
              setModalOpenLogin(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
