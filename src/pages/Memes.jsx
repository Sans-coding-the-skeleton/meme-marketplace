/**
 * Memes Page
 * ----------
 * Displays the main catalog of memes in a grid format.
 * Features:
 * - Fetching memes from the service
 * - Searching by name
 * - Filtering by category
 * - Sorting by multiple criteria (Name, Rating, Size)
 * - Loading Skeletons
 */
import React, { useState, useEffect, useMemo } from 'react';
import { fetchMemes, CATEGORIES as SERVICE_CATEGORIES } from '../services/memeService';
import MemeCard from '../components/MemeCard';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ["All", ...SERVICE_CATEGORIES];

const Memes = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name'); // Options: name, rating, size

    // Fetch memes on mount
    useEffect(() => {
        const loadMemes = async () => {
            setLoading(true);
            try {
                const data = await fetchMemes();
                setMemes(data);
            } catch (err) {
                setError("Failed to load memes");
            } finally {
                setLoading(false);
            }
        };
        loadMemes();
    }, []);

    /**
     * Filter and Sort Logic
     * Uses useMemo to efficiently recalculate only when dependencies change.
     */
    const filteredMemes = useMemo(() => {
        let result = [...memes];

        // 1. Search Filter
        if (searchTerm) {
            result = result.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // 2. Category Filter
        if (selectedCategory !== 'All') {
            result = result.filter(m => m.category === selectedCategory);
        }

        // 3. Sorting
        result.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'rating_asc') return a.rating - b.rating;
            if (sortBy === 'size') return (b.width * b.height) - (a.width * a.height);
            if (sortBy === 'size_asc') return (a.width * a.height) - (b.width * b.height);
            return 0;
        });

        return result;
    }, [memes, searchTerm, selectedCategory, sortBy]);

    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <div className="space-y-6">
            {/* Control Bar: Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                {/* Search Input */}
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search memes..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdowns */}
                <div className="flex gap-4 w-full md:w-auto">
                    {/* Category SELECT */}
                    <select
                        className="w-1/2 md:w-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    {/* Sorting SELECT */}
                    <select
                        className="w-1/2 md:w-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                        <option value="rating">Rating (High to Low)</option>
                        <option value="rating_asc">Rating (Low to High)</option>
                        <option value="size">Size (Large to Small)</option>
                        <option value="size_asc">Size (Small to Large)</option>
                    </select>
                </div>
            </div>

            {/* Grid Display */}
            {loading ? (
                // Skeleton Loaders
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Showing {filteredMemes.length} results</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredMemes.map(meme => (
                            <MemeCard key={meme.id} meme={meme} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredMemes.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No memes found matching your criteria.
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Memes;
