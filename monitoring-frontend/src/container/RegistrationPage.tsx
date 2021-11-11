import React, {FunctionComponent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserServiceV1 from "../service/user/UserServiceV1";
import RegisterForm from "../model/RegisterForm";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

/**
 *
 * @constructor Varun Shrivastava
 */
const RegistrationPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const userService = new UserServiceV1();
    const [registerForm, setRegisterForm] = useState<RegisterForm>({username: "", password: ""});

    /**
     * update the state of the user form
     * @param fieldName
     */
    const updateForm = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        setRegisterForm({...registerForm, [fieldName]: value});
    }

    /**
     * if user registration is successful then navigate to the login page
     */
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

export default RegistrationPage