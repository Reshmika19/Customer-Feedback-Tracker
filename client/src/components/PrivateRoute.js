import React from 'react';
import { Route, Navigate } from 'react-router-dom';  // Import Navigate instead of Redirect

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('adminToken');  // Get token from localStorage

  return (
    <Route
      {...rest}
      element={
        token ? (
          <Component />  // If token exists, allow access to the page
        ) : (
          <Navigate to="/login" />  // If no token, redirect to login page
        )
      }
    />
  );
};

export default PrivateRoute;
