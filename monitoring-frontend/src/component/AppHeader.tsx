import React, {FunctionComponent} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const AppHeader: FunctionComponent = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    return <>
        <Navbar bg="light" variant="light">
            <Container>
                <Link to={"/dashboard"} style={{textDecoration: "none"}}>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <Nav.Link>
                        <Link to={"/dashboard"} style={{textDecoration: "none"}}>
                            Home
                        </Link>
                    </Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant={"light"} onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default AppHeader;