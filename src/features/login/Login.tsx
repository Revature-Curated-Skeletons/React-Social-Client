import React, { useRef } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { useAppDispatch } from '../../app/hooks'
import { setTokenAsync } from './authSlice'
import { reverbClientWithAuth } from '../../remote/reverb-api/reverbClient'

export let util = {loginAccount: (event: any) => {}};

export default function Login() {

  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Verifying login credentials through firebase, alerting with error message coming from Firebase
  util.loginAccount = async (event: any) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {

      const email: string = emailRef.current.value;
      const password: string = passwordRef.current.value;

      // Token is set to store on login
      await dispatch(setTokenAsync({ email, password }));

      // Call to backend on successful log in that ensures user is already stored in our database, if it is not then the user is added to the database.
      reverbClientWithAuth.post("/api/user/login");

    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="loginRow">
        <Col>
          <h2>Login</h2>
          <div id="loginDiv" className="d-flex">
            <Card id="loginCard">
              <Card.Body>
                <Form id="inputLogin">
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Button data-testid="submitButton" className="w-100 mt-2" type="submit" onClick={(event) => util.loginAccount(event)}>Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}