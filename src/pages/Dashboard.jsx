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
  const [memeOfTheDay, setMemeOfTheDay] = useState(null);

  // Fetch data on mount to populate stats
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMemes();
        setMemes(data);

        if (data.length > 0) {
          // Find most popular (highest rating)
          const sorted = [...data].sort((a, b) => b.rating - a.rating);
          setMostPopular(sorted[0]);

          // Deterministic Meme of the Day based on date
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 0);
          const diff = now - start;
          const oneDay = 1000 * 60 * 60 * 24;
          const dayOfYear = Math.floor(diff / oneDay);

          // Select meme using modulo
          const index = dayOfYear % data.length;
          setMemeOfTheDay(data[index]);
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Memes</h3>
          <p className="text-3xl font-bold">{loading ? "..." : memes.length}</p>
        </div>

        {/* Categories Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Categories</h3>
          <p className="text-3xl font-bold">{loading ? "..." : totalCategories}</p>
        </div>

        {/* Cart Items Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Items in Cart</h3>
          <p className="text-3xl font-bold">{getTotalItems()}</p>
        </div>

        {/* Cart Value Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Value</h3>
          <p className="text-3xl font-bold">${getTotalPrice()}</p>
        </div>
      </div>

      {/* Meme of the Day Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meme of the Day Section */}
        <div className="bg-indigo-600 rounded-xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Meme of the Day</h2>
          {loading ? (
            <div className="animate-pulse h-64 bg-white/20 rounded-lg"></div>
          ) : memeOfTheDay ? (
            <div className="flex flex-col gap-4">
              <img src={memeOfTheDay.url} alt={memeOfTheDay.name} className="w-full h-64 object-cover rounded-lg shadow-2xl" />
              <div>
                <h3 className="text-xl font-bold line-clamp-1">{memeOfTheDay.name}</h3>
                <p className="mt-2 text-indigo-200">Category: {memeOfTheDay.category}</p>
                <Link to={`/memes/${memeOfTheDay.id}`} className="mt-4 inline-block bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ) : (
            <p>No meme available</p>
          )}
        </div>

        {/* Most Popular Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Most Popular</h2>
          {loading ? (
            <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ) : mostPopular ? (
            <div className="flex flex-col gap-4">
              <div className="relative h-64">
                <img src={mostPopular.url} alt={mostPopular.name} className="w-full h-full object-cover rounded-lg shadow-md" />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm shadow-sm">
                  Top Rated
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold line-clamp-1">{mostPopular.name}</h3>
                  <span className="text-yellow-500">{"⭐".repeat(mostPopular.rating)}</span>
                </div>
                <p className="mt-1 text-gray-500 dark:text-gray-400">Category: {mostPopular.category}</p>
                <Link to={`/memes/${mostPopular.id}`} className="mt-4 inline-block w-full text-center bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition-colors">
                  Check it Out
                </Link>
              </div>
            </div>
          ) : (
            <p>No popular memes found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
