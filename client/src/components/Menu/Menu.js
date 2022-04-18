import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext.js";
import navbarlogo from "../../assets/images/navbarlogo.png";
import { useEffect, useState } from 'react';
import { query, where, collection, docs, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';

const Menu = () => {
    const { currentUser } = useAuth();
    const [userRole, setUserRole] = useState();
    const [showEditLink, setShowEditLink] = useState(false);

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const users = collection(db, 'users');
                const q = query(users, where("email", "==", currentUser?.email));
                const user = await getDocs(q);
                user.docs.map(x => setUserRole(prevState => x.data().role));
                setShowEditLink(true);
            }
        })();
    }, [currentUser])

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
                        {userRole === 'admin'
                            ? <Nav.Link as={Link} to="/admin/requests/becomeadoctor">Requests</Nav.Link>
                            : null}

                        {/* Should be only for admins! */}
                    </Nav>
                    <Nav>
                        {/* {currentUser ? <>
                            <Navbar.Text >
                                Wellcome, {currentUser?.email}
                            </Navbar.Text>
                            <Nav.Link as={Link} to={`/account/${currentUser?.uid}`}>Account</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </> : null
                        } */}

                        {currentUser ? <>
                            <Navbar.Text >
                                Wellcome, {currentUser?.email}
                            </Navbar.Text>
                            {showEditLink
                                ? userRole === 'client'
                                    ? <Nav.Link as={Link} to={`/account/${currentUser?.uid}`}>Account</Nav.Link>
                                    : <Nav.Link as={Link} to={`/doctor-account/${currentUser?.uid}`}>Account</Nav.Link>
                                : null
                            }

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
