import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext.js";
import navbarlogo from "../../assets/images/navbarlogo.png";

const Menu = () => {
    const { currentUser } = useAuth();

    return (
        <Navbar className='position-relative' collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand>
                    <img src={navbarlogo} style={style.navbarlogo} ></img>
                </Navbar.Brand>
                <Navbar.Brand as={Link} to="/">SuperMedical</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/doctors">View all doctors</Nav.Link>
                        {currentUser
                            ? <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
                            : null}
                        <NavDropdown title="Help" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#">Questions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/policy">Privacy policy</NavDropdown.Item>
                        </NavDropdown>

                        {/* Should be only for admins! */}
                        <Nav.Link as={Link} to="/admin/requests/becomeadoctor">Requests</Nav.Link>
                        {/* Should be only for admins! */}
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

const style = {
    navbarlogo: {
        width: '30px',
        height: '30px',
        backgroundColor: 'white'
    }
}
