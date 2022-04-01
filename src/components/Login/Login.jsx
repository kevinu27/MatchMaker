import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

function Login(props) {
  const loginAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/login`;

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const handleInputChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handleInputChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(pwd);
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();

    loginAxios.post(baseURL, { username, pwd }).then((loggedUserfromServer) => {
      console.log("Login");
      props.storeUser(loggedUserfromServer.data);
      console.log(
        "loggedUserfromServer.data.username",
        loggedUserfromServer.data.username
      );
      setUsername("");
      setPwd("");
      props.setLoggedUserName(loggedUserfromServer.data.username);

      props.setModalOpenLogin(false);
      /// setstate de un div que ponga mensaje de conectado con exito
    });
  };

  return (
    <>
      <div>
        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <h1>Login</h1>

            <hr></hr>

            <Form onSubmit={HandleFormSubmit}>
              <Form.Group controlId="username">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleInputChangeUsername}
                  name="username"
                />
              </Form.Group>

              <Form.Group controlId="pwd">
                <Form.Label>
                  <p>Password</p>
                </Form.Label>
                <Form.Control
                  type="password"
                  value={pwd}
                  onChange={handleInputChangePwd}
                  name="pwd"
                />
              </Form.Group>

              <Button
                style={{ marginTop: "10%", width: "50%", marginBottom: "10%" }}
                variant="dark"
                type="submit"
              >
                Login
              </Button>
            </Form>

            {/* <Link to="/"> */}
            {/* <Button variant="dark">Volver</Button> */}
            {/* </Link> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
