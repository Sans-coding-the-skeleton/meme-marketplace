/**
 * Application Entry Point
 * -----------------------
 * This file bootstraps the React application.
 * It imports the global CSS and renders the root App component
 * inside standard React StrictMode for development checks.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Import global Tailwind styles

// Create the root element and render the application
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
