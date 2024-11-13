// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} required />
      <input type="email" name="email" value={email} onChange={onChange} required />
      <input type="password" name="password" value={password} onChange={onChange} required />
      <button type="submit">Register</button>
      {auth.loading && <p>Loading...</p>}
      {auth.error && <p>{auth.error}</p>}
    </form>
  );
};

export default Register;
