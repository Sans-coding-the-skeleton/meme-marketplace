/**
 * PrivateRoute Component
 * ----------------------
 * A wrapper component that protects routes requiring authentication.
 * It checks the auth state and redirects unauthenticated users to the login page.
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { user } = useAuth();

    // Logic: Check if user object exists and loggedIn property is true.
    // If not logged in, redirect to login page immediately.
    if (!user || !user.loggedIn) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, render the child routes (Outlet).
    return <Outlet />;
};

export default PrivateRoute;
