// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../actions/authActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (auth.loading) {
    return <p>Loading...</p>;
  }

  if (!auth.isAuthenticated) {
    return <p>You are not authenticated.</p>;
  }

  return (
    <div>
      <h1>Welcome, {auth.user && auth.user.name}!</h1>
      {auth.error && <p>{auth.error}</p>}
    </div>
  );
};

export default Dashboard;
