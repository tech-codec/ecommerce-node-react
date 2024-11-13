// src/components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/authActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onChange = e => setEmail(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        required
        placeholder="Enter your email"
      />
      <button type="submit">Submit</button>
      {auth.loading && <p>Loading...</p>}
      {auth.error && <p>{auth.error}</p>}
      {auth.message && <p>{auth.message}</p>}
    </form>
  );
};

export default ForgotPassword;
