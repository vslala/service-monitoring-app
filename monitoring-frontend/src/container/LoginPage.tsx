import React, {FunctionComponent, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import UserServiceV1 from "../service/user/UserServiceV1";
import UserLoginForm from "../model/UserLoginForm";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

/**
 *
 * @constructor Varun Shrivastava
 */
const LoginPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const userService = new UserServiceV1();
    const [loginForm, setLoginForm] = useState<UserLoginForm>({username: "", password: ""});

    /**
     * update the state of the user form
     * @param fieldName
     */
    const updateForm = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        setLoginForm({...loginForm, [fieldName]: value});
    }

    /**
     * redirect user to dashboard on successful login
     */
    const handleLogin = async () => {
        console.log(loginForm);
        if (await userService.login(loginForm)) {
            navigate("/dashboard");
        }
    }

    if (localStorage.getItem("user")) {
        return <Navigate replace to={"/dashboard"}/>
    }

    return <Container className={"d-flex justify-content-center align-items-center"} style={{height: "20em"}}>
        <Row style={{display: "table-cell", verticalAlign: "middle"}}>
            <Col>
                <Card>
                    <Card.Header className={"d-flex justify-content-center"}>
                        <h3>Admin Login</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                <Form.Control value={loginForm.username} type={"text"} placeholder={"username"}
                                              onChange={updateForm("username")}/>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-1" controlId="formPlaintextPassword">
                                <Form.Control type="password" placeholder="Password"
                                              onChange={updateForm("password")}/>
                            </Form.Group>

                            <Form.Group as={Row} className={"mb-1"}>
                                <Button variant={"outline-primary"} onClick={handleLogin}>Login</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={"/register"}>New User Sign Up!</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>;
}

export default LoginPage