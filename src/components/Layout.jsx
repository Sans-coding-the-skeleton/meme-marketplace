/**
 * Layout Component
 * ----------------
 * Provides the structural "shell" of the application.
 * It stays consistent across route changes and contains the navigation bar and footer.
 * It also handles the global Theme toggling logic.
 */
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import useLocalStorage from '../hooks/useLocalStorage';
import { Sun, Moon, ShoppingCart, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { getTotalItems } = useCart();

    // Persist theme preference in local storage
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    // Apply theme class to the HTML document element whenever theme changes
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    /**
     * toggleTheme
     * Switches between light and dark modes.
     */
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    /**
     * handleLogout
     * Signs the user out and redirects to the login page.
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* --- Navigation Bar --- */}
            <nav className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Mobile Menu Button (implied) */}
                        <div className="flex items-center">
                            <Link to="/dashboard" className="text-2xl font-bold text-green-600 dark:text-green-400">
                                Meme Marketplace
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/dashboard" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                    <Link to="/memes" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Memes</Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Actions: Theme, Cart, User Profile */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle Button */}
                            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Toggle Theme">
                                <Sun className="h-5 w-5 dark:hidden" />
                                <Moon className="h-5 w-5 hidden dark:block" />
                            </button>

                            {/* Cart Icon with Notification Badge */}
                            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative" title="View Cart">
                                <ShoppingCart className="h-5 w-5" />
                                {getTotalItems() > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu */}
                            <div className="flex items-center gap-2 border-l pl-4 ml-2 border-gray-300 dark:border-gray-700">
                                <span className="text-sm font-medium hidden sm:block">{user?.username}</span>
                                <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full" title="Logout">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- Main Content Area --- */}
            <main className="flex-grow max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Outlet renders the child route's element */}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
