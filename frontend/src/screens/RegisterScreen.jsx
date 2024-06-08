import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/photographerApiSlices';
import { useRegisterOwnerMutation } from '../slices/locationOwnerApiSlices';
import { useRegisterClientMutation } from '../slices/clientApiSlices';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import registerImage from '../images/register.svg';
import './CSS/RegisterForm.css';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState(0);
  const [instagramLink, setInstagramLink] = useState('');
  const [faceBookLink, setFaceBookLink] = useState('');
  const [file, setFile] = useState();
  // const [files, setFiles] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading: loadingPhotographer }] = useRegisterMutation();
  const [registerOwner, { isLoading: loadingOwner }] =
    useRegisterOwnerMutation();
  const [registerClient, { isLoading: loadingClient }] =
    useRegisterClientMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [navigate, userInfo]);

  const handlePhotographer = () => {
    setStatus('photographer');
  };

  const handleClient = () => {
    setStatus('client');
  };

  const handleLocationOwner = () => {
    setStatus('locationOwner');
  };

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files).slice(0, 5);
  //   setFiles(selectedFiles);

  //   if (selectedFiles.length >= 5) {
  //     e.target.disabled = true;
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(file);

    if (status === 'photographer') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('whatsAppNumber', whatsAppNumber);
          formData.append('instagramLink', instagramLink);
          formData.append('faceBookLink', faceBookLink);
          formData.append('status', status);
          formData.append('profilePic', file);

          const res = await register(formData).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(`/photographer-dashboard/${userInfo._id}`);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } else if (status === 'client') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await registerClient({
            firstName,
            lastName,
            email,
            password,
            status,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } else if (status === 'locationOwner') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await registerOwner({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            whatsAppNumber,
            instagramLink,
            faceBookLink,
            status,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  };
  return (
    <div className="registerForm">
      <div className="registerImage">
        <img src={registerImage} alt="register-image" />
      </div>
      <div className="register-form-container">
        <h1>Register</h1>
        <Row className="mb-4">
          <p>I'm signing as a</p>
          <Col>
            <input
              type="radio"
              onClick={handlePhotographer}
              name="loginUsers"
              id=""
            />{' '}
            <label htmlFor="">Photographer</label>
          </Col>

          <Col>
            <input
              type="radio"
              onClick={handleClient}
              name="loginUsers"
              id=""
            />{' '}
            <label htmlFor="">Client</label>
          </Col>

          <Col>
            <input
              type="radio"
              onClick={handleLocationOwner}
              name="loginUsers"
              id=""
            />{' '}
            <label htmlFor="">Location owner</label>
          </Col>
        </Row>
        <Form onSubmit={submitHandler}>
          <Row>
            <Form.Group className="my-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>
          {status !== 'client' && (
            <Row>
              <Col>
                <Form.Group className="my-2" controlId="whatsAppNumber">
                  <Form.Label>Whatsapp Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter whatsapp number"
                    value={whatsAppNumber}
                    onChange={(e) => setWhatsAppNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="instagramLink">
                  <Form.Label>Instagram Link</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter instagram link"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="faceBookLink">
                  <Form.Label>Facebook Link</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter facebook link"
                    value={faceBookLink}
                    onChange={(e) => setFaceBookLink(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )}

          {status === 'photographer' && (
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Your Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          )}

          <Button
            type="submit"
            variant="primary"
            className="mt-2 registerButton"
          >
            Register
          </Button>

          {loadingPhotographer && <Loader />}
          {loadingOwner && <Loader />}
          {loadingClient && <Loader />}
        </Form>

        <Row className="py-3 loginLink">
          <Col>
            Already have an account? <Link to={`/login`}>Login</Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisterScreen;
