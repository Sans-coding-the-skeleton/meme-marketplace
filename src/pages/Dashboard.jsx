/**
 * Dashboard Page
 * --------------
 * The main landing page after login.
 * Displays key metrics and the "Meme of the Day".
 */
import React, { useEffect, useState } from 'react';
import { fetchMemes } from '../services/memeService';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getTotalItems, getTotalPrice } = useCart();
  const [mostPopular, setMostPopular] = useState(null);

  // Fetch data on mount to populate stats
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMemes();
        setMemes(data);

        // Find most popular (highest rating)
        if (data.length > 0) {
          const sorted = [...data].sort((a, b) => b.rating - a.rating);
          setMostPopular(sorted[0]);
        }
      } catch (err) {
        setError("Failed to load memes");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Calculate unique categories count
  const totalCategories = new Set(memes.map(m => m.category)).size;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {error && <div className="text-red-500 bg-red-100 p-4 rounded">{error}</div>}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Memes Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Memes</h3>
          <p className="text-3xl font-bold">{loading ? "..." : memes.length}</p>
        </div>

        {/* Categories Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Categories</h3>
          <p className="text-3xl font-bold">{loading ? "..." : totalCategories}</p>
        </div>

        {/* Cart Items Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Items in Cart</h3>
          <p className="text-3xl font-bold">{getTotalItems()}</p>
        </div>

        {/* Cart Value Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Value</h3>
          <p className="text-3xl font-bold">${getTotalPrice()}</p>
        </div>
      </div>

      {/* Meme of the Day Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Meme of the Day (Most Popular)</h2>
        {loading ? (
          <div className="animate-pulse h-64 bg-white/20 rounded-lg"></div>
        ) : mostPopular ? (
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img src={mostPopular.url} alt={mostPopular.name} className="max-h-64 rounded-lg shadow-2xl" />
            <div>
              <h3 className="text-xl font-bold">{mostPopular.name}</h3>
              <p className="mt-2 text-yellow-300 text-lg">Rating: {"⭐".repeat(mostPopular.rating)}</p>
              <p className="mt-1 opacity-90">Category: {mostPopular.category}</p>
              <Link to="/memes" className="mt-4 inline-block bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Go to Memes
              </Link>
            </div>
          </div>
        ) : (
          <p>No memes available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
