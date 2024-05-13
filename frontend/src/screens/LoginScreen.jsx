import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/photographerApiSlices';
import { useLoginClientMutation } from '../slices/clientApiSlices';
import { useLoginOwnerMutation } from '../slices/locationOwnerApiSlices';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import './CSS/LoginForm.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [loginClient, { isLoading: loadingClient }] = useLoginClientMutation();
  const [loginOwner, { isLoading: loadingOwner }] = useLoginOwnerMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (status === 'photographer') {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } else if (status === 'client') {
        const res = await loginClient({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } else {
        const res = await loginOwner({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePhotographer = () => {
    setStatus('photographer');
  };

  const handleClient = () => {
    setStatus('client');
  };

  const handleLocationOwner = () => {
    setStatus('locationOwner');
  };

  return (
    <div className="loginForm">
      <FormContainer>
        <h1>Sign In</h1>
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
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            className="mt-3"
          >
            Sign In
          </Button>
        </Form>

        {isLoading && <Loader />}
        {loadingClient && <Loader />}
        {loadingOwner && <Loader />}

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
