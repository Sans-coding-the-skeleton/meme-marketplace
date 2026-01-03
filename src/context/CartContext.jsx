/**
 * Cart Context
 * ------------
 * Manages the state of the shopping cart globally.
 * It handles adding, removing, and updating item quantities.
 */
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Persist cart items in localStorage so they survive refreshes
    const [cart, setCart] = useLocalStorage('cart', []);

    /**
     * addItem
     * Adds a meme to the cart. If it already exists, increments quantity.
     * @param {Object} meme - The meme object to add.
     */
    const addItem = (meme) => {
        setCart((prevCart) => {
            // Check if item is already in cart
            const existingItem = prevCart.find((item) => item.id === meme.id);
            if (existingItem) {
                // If yes, map through and increment quantity for this specific item
                return prevCart.map((item) =>
                    item.id === meme.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If no, add new item with quantity 1
                return [...prevCart, { ...meme, quantity: 1 }];
            }
        });
    };

    /**
     * removeItem
     * Completely removes an item from the cart regardless of quantity.
     * @param {string} id - The ID of the meme to remove.
     */
    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    /**
     * decreaseCount
     * Decrements the quantity of an item.
     * If quantity is 1, it removes the item.
     * @param {string} id - The ID of the item.
     */
    const decreaseCount = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem?.quantity === 1) {
                return prevCart.filter(item => item.id !== id);
            }
            return prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    /**
     * clearCart
     * Empties the entire cart.
     */
    const clearCart = () => {
        setCart([]);
    };

    /**
     * getTotalPrice
     * Calculates the total cost of all items in the cart.
     * @returns {number} The total price.
     */
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    /**
     * getTotalItems
     * Calculates total number of individual items (sum of quantities).
      * @returns {number} Total count.
     */
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, decreaseCount, clearCart, getTotalPrice, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
