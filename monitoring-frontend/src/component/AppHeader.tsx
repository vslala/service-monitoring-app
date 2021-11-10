import React, {FunctionComponent} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
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
            </Container>
        </Navbar>
    </>
}

export default AppHeader;