/**
 * MemeDetail Page
 * ---------------
 * Shows detailed information about a specific meme.
 * Features:
 * - Fetching item details by ID
 * - Displaying large image, full description/stats
 * - 'Add to Cart' functionality
 * - 'Related Memes' suggestion engine
 */
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMemeById, fetchMemes } from '../services/memeService';
import { useCart } from '../hooks/useCart';
import MemeCard from '../components/MemeCard';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const MemeDetail = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const { addItem } = useCart();

    const [meme, setMeme] = useState(null);
    const [relatedMemes, setRelatedMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMeme = async () => {
            setLoading(true);
            try {
                // Fetch all memes first to verify and get related
                // In a real app with proper ID endpoint, we'd fetch specific first.
                // Our service abstraction handles this logic somewhat, but for related we need all.
                const allMemes = await fetchMemes();
                const foundMeme = await getMemeById(id, allMemes);

                if (!foundMeme) {
                    setError("Meme not found");
                    return;
                }

                setMeme(foundMeme);

                // Find related memes (same category, excluding current)
                // We shuffle the results to give variety
                const related = allMemes
                    .filter(m => m.category === foundMeme.category && m.id !== foundMeme.id)
                    .sort(() => 0.5 - Math.random()) // Simple shuffle
                    .slice(0, 3); // Take top 3

                setRelatedMemes(related);

            } catch (err) {
                setError("Failed to load meme details");
            } finally {
                setLoading(false);
            }
        };
        loadMeme();

        // Scroll to top when id changes (e.g. clicking a related meme)
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-500">{error}</h2>
            <button onClick={() => navigate('/memes')} className="mt-4 text-green-600 hover:text-green-800">Back to Memes</button>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </button>

            {/* Main Content Layout */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                {/* Left Column: Image */}
                <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center p-4">
                    <img src={meme.url} alt={meme.name} className="max-h-[600px] w-full object-contain rounded-lg" />
                </div>

                {/* Right Column: Details & Actions */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold uppercase tracking-wide">
                                {meme.category}
                            </span>
                            <span className="text-yellow-400 text-xl">{"⭐".repeat(meme.rating)}</span>
                        </div>
                        <h1 className="text-3xl font-extrabold">{meme.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">Dimensions: {meme.width} x {meme.height} px</p>
                    </div>

                    {/* Price Display */}
                    <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6">
                        <div className="flex items-end justify-between">
                            <span className="text-4xl font-bold text-green-600 dark:text-green-400">${meme.price}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => addItem(meme)}
                            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-xl md:px-10 transition-colors shadow-lg"
                        >
                            <ShoppingCart className="mr-2 h-6 w-6" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Memes Section */}
            {relatedMemes.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Related Memes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedMemes.map(m => (
                            <MemeCard key={m.id} meme={m} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemeDetail;
