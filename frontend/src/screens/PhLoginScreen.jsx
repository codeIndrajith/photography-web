import React, { useState } from 'react';
import './CSS/Ph-login.css';
import { useLoginPhClubMutation } from '../slices/phClubApiSlices';
import { setCredentials } from '../slices/authPhClub';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const PhLoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const [loginPhClub, isLoading] = useLoginPhClubMutation();

  // handle submit function
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error('Add details');
    } else {
      try {
        const res = await loginPhClub(name, email).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Login success');
        setName('');
        setEmail('');
      } catch (error) {
        toast.error(error);
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sign in Account</h2>
        </div>
        <form className="login-form" onSubmit={submitHandler}>
          <div>
            <label className="login-label">Email</label>
            <input
              type="text"
              className="login-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="login-label">Password</label>
            <input
              type="text"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhLoginScreen;
