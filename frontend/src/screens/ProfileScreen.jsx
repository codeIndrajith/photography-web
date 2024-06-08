import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdatePhotographerMutation } from '../slices/photographerApiSlices';
import { useUpdateClientMutation } from '../slices/clientApiSlices';
import { useUpdateOwnerMutation } from '../slices/locationOwnerApiSlices';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState(0);
  const [instagramLink, setInstagramLink] = useState('');
  const [faceBookLink, setFaceBookLink] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updatePhotographer, { isLoading: photographerLoadingUpdate }] =
    useUpdatePhotographerMutation();
  const [updateClient, { isLoading: clientLoadingUpdate }] =
    useUpdateClientMutation();
  const [updateLocationOwner, { isLoading: locationOwnerLoadingUpdate }] =
    useUpdateOwnerMutation();

  useEffect(() => {
    const nameParts = userInfo.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[1];
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(userInfo.email);

    // if(userInfo.status === 'client') {
    //   setFirstName(firstName);
    //   setLastName(lastName);
    //   setEmail(userInfo.email);
    // } else if(userInfo.status === 'photographer') {
    //   setFirstName(firstName);
    //   setLastName(lastName);
    //   setEmail(userInfo.email);
    // } else {
    //   setFirstName(firstName);
    //   setLastName(lastName);
    //   setEmail(userInfo.email);
    // }
  }, [userInfo.email, userInfo.firstName, userInfo.lastName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userInfo.status === 'client') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await updateClient({
            _id: userInfo._id,
            firstName,
            lastName,
            email,
            password,
          }).unwrap();
          console.log(res);
          dispatch(
            setCredentials({
              ...res,
            })
          );
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } else if (userInfo.status === 'photographer') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else if (
        whatsAppNumber === 0 ||
        instagramLink === '' ||
        faceBookLink === ''
      ) {
        toast.error('Update social media or add old one');
      } else {
        try {
          const formData = new FormData();
          formData.append('_id', userInfo._id);
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('whatsAppNumber', whatsAppNumber);
          formData.append('instagramLink', instagramLink);
          formData.append('faceBookLink', faceBookLink);
          formData.append('status', status);
          formData.append('profilePic', file);

          const res = await updatePhotographer(formData).unwrap();
          dispatch(
            setCredentials({
              ...res,
            })
          );
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    } else {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else if (
        whatsAppNumber === 0 ||
        instagramLink === '' ||
        faceBookLink === ''
      ) {
        toast.error('Update social media or add old one');
      } else {
        try {
          const res = await updateLocationOwner({
            _id: userInfo._id,
            firstName,
            lastName,
            email,
            whatsAppNumber,
            instagramLink,
            faceBookLink,
            password,
          }).unwrap();
          dispatch(
            setCredentials({
              ...res,
            })
          );
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  };
  return (
    <FormContainer>
      {userInfo.status === 'client' ? (
        <div>
          <h1>Update Client</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="firstName"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="new-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirm-new-Password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="confirm-new-password"
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update Client
            </Button>

            {clientLoadingUpdate && <Loader />}
          </Form>
        </div>
      ) : userInfo.status === 'photographer' ? (
        <div>
          <h1>Update Photographer</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="firstName"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="whatsAppNo">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter WhatsApp Number"
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="instagramLink">
              <Form.Label>Instagram Link</Form.Label>
              <Form.Control
                type="name"
                placeholder="Past your Instagram Link"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="faceBookLink">
              <Form.Label>Facebook Link</Form.Label>
              <Form.Control
                type="name"
                placeholder="Past your Facebook Link"
                value={faceBookLink}
                onChange={(e) => setFaceBookLink(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="new-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirm-new-Password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="confirm-new-password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="profilePic">
              <Form.Label>Your Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update Photographer
            </Button>

            {photographerLoadingUpdate && <Loader />}
          </Form>
        </div>
      ) : (
        <div>
          <h1>Update Location Owner</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="firstName"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="whatsAppNo">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter WhatsApp Number"
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="instagramLink">
              <Form.Label>Instagram Link</Form.Label>
              <Form.Control
                type="name"
                placeholder="Past your Instagram Link"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="faceBookLink">
              <Form.Label>Facebook Link</Form.Label>
              <Form.Control
                type="name"
                placeholder="Past your Facebook Link"
                value={faceBookLink}
                onChange={(e) => setFaceBookLink(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="new-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirm-new-Password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="confirm-new-password"
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update Location Owner
            </Button>
            {locationOwnerLoadingUpdate && <Loader />}
          </Form>
        </div>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
