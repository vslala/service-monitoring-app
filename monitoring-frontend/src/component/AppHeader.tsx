import React, {FunctionComponent} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const AppHeader: FunctionComponent = () => {
    return <>
        <Navbar bg="light" variant="light">
            <Container>
                <Link to={"/dashboard"} style={{textDecoration: "none"}}>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <Link to={"/dashboard"} style={{textDecoration: "none"}}>
                        <Nav.Link>Home</Nav.Link>
                    </Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant={"light"} onClick={() => localStorage.removeItem("user")}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default AppHeader;