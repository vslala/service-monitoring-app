import React, {FunctionComponent, useState} from 'react';
import './App.css';
import {Button, Card, Col, Container, Form, ListGroup, Nav, Navbar, Row} from "react-bootstrap";
import {HashRouter as Router, Link, Route, Routes, useNavigate, Navigate} from "react-router-dom";
import UserLoginForm from "./model/UserLoginForm";
import RegisterForm from "./model/RegisterForm";
import UserServiceV1 from "./service/user/UserServiceV1";
import AppHeader from "./component/AppHeader";
import ListServices from "./component/ListServices";
import WebService from "./model/WebService";

const App: FunctionComponent = () => {
    const LoginPage: FunctionComponent = () => {
        const navigate = useNavigate();
        const userService = new UserServiceV1();
        const [loginForm, setLoginForm] = useState<UserLoginForm>({username: "", password: ""});

        const updateForm = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value;
            setLoginForm({...loginForm, [fieldName]: value});
        }

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
                            <Link to={"register"}>New User Sign Up!</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>;
    }
    const RegisterPage: FunctionComponent = () => {
        const navigate = useNavigate();
        const userService = new UserServiceV1();
        const [registerForm, setRegisterForm] = useState<RegisterForm>({username: "", password: ""});

        const updateForm = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.currentTarget.value;
            setRegisterForm({...registerForm, [fieldName]: value});
        }

        const handleRegister = async () => {
            console.log(registerForm);
            if (await userService.register(registerForm)) {
                navigate("/");
            }
        }

        return <Container className={"d-flex justify-content-center align-items-center"} style={{height: "20em"}}>
            <Row style={{display: "table-cell", verticalAlign: "middle"}}>
                <Col>
                    <Card>
                        <Card.Header className={"d-flex justify-content-center"}>
                            <h3>Admin Register</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                                    <Form.Control value={registerForm.username} type={"text"} placeholder={"username"}
                                                  onChange={updateForm("username")}/>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-1" controlId="formPlaintextPassword">
                                    <Form.Control type="password" placeholder="Password" value={registerForm.password}
                                                  onChange={updateForm("password")}/>
                                </Form.Group>

                                <Form.Group as={Row} className={"mb-1"}>
                                    <Button variant={"outline-primary"} onClick={handleRegister}>Register</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Link to={"/"}>Login here</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>;
    }

    const UserDashboardPage: FunctionComponent = () => {
        const [services, setServices] = useState<WebService[]>([
            {
                name: "bma",
                url: "https://www.bemyaficionado.com",
                healthStatus: "OK",
                createdAt: "",
                id: 1
            },
            {
                name: "vslala",
                url: "https://www.varunshrivastava.in",
                healthStatus: "FAIL",
                createdAt: "",
                id: 2
            }
        ]);

        const deleteService = (id:number) => {
            setServices(services.filter(service => service.id !== id));
        }

        return <>
            <AppHeader/>
            <Container>
                <Row>
                    <Col>
                        <Button style={{marginBottom: "10px", marginTop: "10px"}}>Add New Service</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListServices services={services} delete={deleteService}/>
                    </Col>
                </Row>
            </Container>
        </>
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/dashboard"} element={<UserDashboardPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
