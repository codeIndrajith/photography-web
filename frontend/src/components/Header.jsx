// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/photographerApiSlices';
import { logout } from '../slices/authSlice';
import logo from '../images/logo.png';
import './CSS/Header.css';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="header">
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid style={{ marginLeft: '50px', marginRight: '50px' }}>
          <LinkContainer to="/" className="logoSection">
            <img className="logo" src={logo} alt="Logo" />
          </LinkContainer>
          <Navbar.Toggle className="toggle" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="linkSection" id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <Nav className="ms-auto">
                    <LinkContainer to="/">
                      <Nav.Link>Home</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/photographers">
                      <Nav.Link>Photographers</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/locations">
                      <Nav.Link>Locations</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/about">
                      <Nav.Link>About us</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <NavDropdown
                    title={
                      userInfo.name ||
                      userInfo.firstName + ' ' + userInfo.lastName
                    }
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
