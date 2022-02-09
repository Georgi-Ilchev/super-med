import { Route, Link, NavLink, Navigate, useNavigate, Routes } from 'react-router-dom';
import { Navbar, Offcanvas, NavDropdown, Nav, Form, Button, Container, FormControl } from 'react-bootstrap';

import { getAuth, signOut } from 'firebase/auth';


const Menu = () => {
    const onLogout = (props) => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                console.log('from signOut , i have to redirect');
                useNavigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">SuperMedical</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/doctors">View all doctors</Nav.Link>
                        <Nav.Link as={Link} to="/features">Appointments</Nav.Link>
                        <NavDropdown title="Help" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Navbar.Text >
                            Wellcome,
                        </Navbar.Text>
                        <Nav.Link as={Link} to="/">Account</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        {/* <Nav.Link as={Link} to="/logout">Logout</Nav.Link> */}
                        <Button onClick={onLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Menu;