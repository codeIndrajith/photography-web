import React, { useState } from 'react';

const PhLoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // handle submit function
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div>
        <div>
          <h2>image</h2>
        </div>
        <div>
          <h2>Sign in Account</h2>
          <form onSubmit={submitHandler}>
            <div>
              <label>Email</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhLoginScreen;
