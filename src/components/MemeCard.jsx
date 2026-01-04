/**
 * MemeCard Component
 * ------------------
 * A presentational component for displaying a single meme in a grid.
 * Features:
 * - Image display with zoom effect on hover
 * - Quick actions overlay (View Details, Add to Cart)
 * - Basic info (Category, Rating, Price)
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Eye } from 'lucide-react';

const MemeCard = ({ meme }) => {
    const { addItem } = useCart();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden group">
                <img
                    src={meme.url}
                    alt={meme.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Overlay: Visible on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4">
                    <Link to={`/memes/${meme.id}`} className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100" title="View Details">
                        <Eye className="h-6 w-6" />
                    </Link>
                    <button onClick={() => addItem(meme)} className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700" title="Add to Cart">
                        <ShoppingCart className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full uppercase tracking-wider text-gray-600 dark:text-gray-300">
                        {meme.category}
                    </span>
                    <span className="text-yellow-400 text-sm">{"⭐".repeat(meme.rating)}</span>
                </div>

                <h3 className="text-lg font-bold mb-2 line-clamp-2">{meme.name}</h3>

                <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">${meme.price}</span>
                    <button
                        onClick={() => addItem(meme)}
                        className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemeCard;
