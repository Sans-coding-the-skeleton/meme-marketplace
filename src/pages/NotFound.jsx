import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
            <p className="text-2xl font-semibold md:text-3xl mt-4">Page not found</p>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition-colors shadow-lg">
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
