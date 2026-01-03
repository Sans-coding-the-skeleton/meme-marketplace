/**
 * Main Application Component (App.jsx)
 * ------------------------------------
 * This component acts as the root of the component tree.
 * It sets up the Routing Application structure and Global Context Providers.
 *
 * Architecture:
 * - Router: Handles navigation between pages.
 * - AuthProvider: Wraps the app to provide user session state globally.
 * - CartProvider: Wraps the app to provide shopping cart state globally.
 * - Routes: Defines the mapping between URL paths and Components.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

// Lazy load pages to improve initial load performance
// These components will only be loaded when their route is accessed.
const Memes = React.lazy(() => import('./pages/Memes'));
const MemeDetail = React.lazy(() => import('./pages/MemeDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));

function App() {
    return (
        <Router>
            {/* AuthProvider makes user login state available throughout the app */}
            <AuthProvider>
                {/* CartProvider makes cart actions (add, remove) available throughout the app */}
                <CartProvider>
                    <Routes>
                        {/* --- Public Routes --- */}
                        {/* The Login page is accessible without authentication */}
                        <Route path="/login" element={<Login />} />

                        {/* --- Private Routes --- */}
                        {/* These routes are protected by the PrivateRoute wrapper. */}
                        {/* If a user is not logged in, they will be redirected to /login. */}
                        <Route element={<PrivateRoute />}>
                            {/* The Layout component provides the Navbar and Footer */}
                            <Route element={<Layout />}>
                                {/* Redirect root path to dashboard */}
                                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                                {/* Dashboard: The main landing after login */}
                                <Route path="/dashboard" element={<Dashboard />} />

                                {/* Memes: The marketplace grid view */}
                                {/* Suspense is used because Memes is a lazy loaded component */}
                                <Route path="/memes" element={
                                    <React.Suspense fallback={<div className="p-10 text-center">Loading Page...</div>}>
                                        <Memes />
                                    </React.Suspense>
                                } />

                                {/* MemeDetail: Individual product view with URL parameter :id */}
                                <Route path="/memes/:id" element={
                                    <React.Suspense fallback={<div className="p-10 text-center">Loading Page...</div>}>
                                        <MemeDetail />
                                    </React.Suspense>
                                } />

                                {/* Cart: Shopping cart view */}
                                <Route path="/cart" element={
                                    <React.Suspense fallback={<div className="p-10 text-center">Loading Page...</div>}>
                                        <Cart />
                                    </React.Suspense>
                                } />
                            </Route>
                        </Route>

                        {/* --- Catch All Route --- */}
                        {/* Matches any URL not defined above, typically for broken links */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
