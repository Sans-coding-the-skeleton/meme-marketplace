/**
 * Cart Page
 * ---------
 * Manages the checkout process.
 * Displays list of items, allows quantity adjustment, and shows total price.
 */
import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeItem, decreaseCount, addItem, clearCart, getTotalPrice } = useCart();

    // Empty State
    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added any memes yet.</p>
                <Link to="/memes" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Browse Memes <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Shopping Cart ({cart.length} items)</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="flex-grow space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center gap-4">
                            {/* Item Thumbnail */}
                            <img src={item.url} alt={item.name} className="w-24 h-24 object-cover rounded-md" />

                            {/* Item Info */}
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{item.category}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <button onClick={() => decreaseCount(item.id)} className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <button onClick={() => addItem(item)} className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Price Calculation (Unit * Qty) */}
                            <div className="text-right min-w-[80px]">
                                <p className="font-bold text-indigo-600 dark:text-indigo-400">${item.price * item.quantity}</p>
                                <p className="text-xs text-gray-500">${item.price} / each</p>
                            </div>

                            {/* Remove Button */}
                            <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary Panel (Sidebar) */}
                <div className="w-full lg:w-80 h-fit bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
                    <h2 className="text-xl font-bold border-b pb-4 dark:border-gray-700">Order Summary</h2>

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${getTotalPrice()}</span>
                    </div>



                    <button onClick={clearCart} className="w-full py-2 text-red-500 text-sm hover:underline">
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
