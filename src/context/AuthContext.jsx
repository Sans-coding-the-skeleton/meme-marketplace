/**
 * Authentication Context
 * ----------------------
 * This file provides a global state for user authentication.
 * It uses the Context API to avoid prop drilling user data.
 */
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create the context object
const AuthContext = createContext();

/**
 * AuthProvider
 * Wraps the application to provide auth state.
 * Uses localStorage to persist the session across browser refreshes.
 */
export const AuthProvider = ({ children }) => {
    // Use custom hook to store user object in localStorage key 'user'
    // Default state is { username: null, loggedIn: false }
    const [user, setUser] = useLocalStorage('user', { username: null, loggedIn: false });

    /**
     * login
     * Updates the state to log the user in.
     * @param {string} username - The username provided by the login form.
     */
    const login = (username) => {
        setUser({ username, loggedIn: true });
    };

    /**
     * logout
     * Clears the user state, effectively logging them out.
     */
    const logout = () => {
        setUser({ username: null, loggedIn: false });
    };

    // The value object is what consumes of this context will access
    const value = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * useAuth Hook
 * Custom hook to easily consume the AuthContext.
 * Usage: const { user, login } = useAuth();
 */
export const useAuth = () => {
    return useContext(AuthContext);
};
