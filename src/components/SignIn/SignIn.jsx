import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./Login.css";

function Login() {
  return (
    <>
      <div>
        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <h1>Login</h1>

            <hr></hr>

            <Form>
              <Form.Group controlId="username">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  //   value={this.state.username}
                  //   onChange={this.handleInputChange}
                  name="username"
                />
              </Form.Group>

              <Form.Group controlId="pwd">
                <Form.Label>
                  <p>Password</p>
                </Form.Label>
                <Form.Control
                  type="password"
                  //   value={this.state.pwd}
                  //   onChange={this.handleInputChange}
                  name="pwd"
                />
              </Form.Group>

              <Button
                style={{ marginTop: "20px", width: "100%" }}
                variant="dark"
                type="submit"
              >
                Login
              </Button>
            </Form>

            <hr></hr>

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
