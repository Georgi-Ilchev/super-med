import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext.js";

const Menu = () => {
    const { currentUser } = useAuth();

    return (
        <Navbar className='position-relative'collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">SuperMedical</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/doctors">View all doctors</Nav.Link>
                        <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
                        <NavDropdown title="Help" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {currentUser ? <>
                            <Navbar.Text >
                                Wellcome, {currentUser?.email}
                            </Navbar.Text>
                            <Nav.Link as={Link} to={`/account/${currentUser?.uid}`}>Account</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </> : null
                        }

                        {!currentUser ? <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </> : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Menu;
